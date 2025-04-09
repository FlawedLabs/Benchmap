import { json, error } from '@sveltejs/kit';
import prisma from '$lib/prisma';
import { auth } from '$lib/server/auth.js';

export async function POST({ params, request }) {
	const session = await auth.api.getSession({
		headers: request.headers
	});

	if (!session) {
		throw error(401, 'Unauthorized');
	}

	const { slug } = params;

	try {
		const bench = await prisma.bench.findUnique({
			where: { slug }
		});

		if (!bench) {
			throw error(404, 'Bench not found');
		}

		// Create the like, and connect it to the user and bench
		const benchLike = await prisma.benchLike.create({
			data: {
				user: {
					connect: { id: session?.user.id }
				},
				bench: {
					connect: { id: bench.id }
				}
			}
		});

		return json({ success: true, benchLike });
	} catch (e: any) {
		// Handle unique constraint violation
		if (e.code === 'P2002') {
			throw error(400, 'User has already liked this bench');
		}
		throw error(500, 'Internal server error');
	}
}

export async function DELETE({ params, request }) {
	const session = await auth.api.getSession({
		headers: request.headers
	});
	if (!session || !session?.user) {
		throw error(401, 'Unauthorized');
	}

	const { slug } = params;

	try {
		const bench = await prisma.bench.findUnique({
			where: { slug }
		});

		if (!bench) {
			throw error(404, 'Bench not found');
		}

		await prisma.benchLike.delete({
			where: {
				userId_benchId: {
					userId: session?.user.id,
					benchId: bench.id
				}
			}
		});

		return json({ success: true });
	} catch (e: any) {
		if (e.code === 'P2025') {
			throw error(404, 'Like not found');
		}
		throw error(500, 'Internal server error');
	}
}
