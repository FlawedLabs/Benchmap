import type { PageServerLoad } from './$types';
import prisma from '$lib/prisma';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params }) => {
	let { username } = params;

	try {
		const user = await prisma.user.findUnique({
			where: {
				name: username
			},
			select: {
				id: true,
				name: true,
				image: true,
				createdAt: true,
				_count: {
					select: {
						benches: true,
						benchLikes: true,
						reviews: true
					}
				},
				benches: {
					include: {
						reviews: { select: { rating: true } },
						tags: true
					},
					orderBy: {
						createdAt: 'desc'
					}
				}
			}
		});

		if (!user) {
			throw error(404, 'User not found');
		}

		return {
			user: {
				...user,
				stats: user._count
			}
		};
	} catch (e) {
		console.log(e);
		throw error(404, 'User not found');
	}
};
