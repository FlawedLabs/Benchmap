import type { PageServerLoad } from './$types';
import prisma from '$lib/prisma';
import { error } from '@sveltejs/kit';
import { auth } from '$lib/server/auth';

export const load: PageServerLoad = async ({ params, request }) => {
	const { slug } = params;
	const session = await auth.api.getSession({
		headers: request.headers
	});

	if (slug) {
		const bench = await prisma.bench.findUnique({
			where: { slug },
			include: {
				reviews: {
					include: {
						reviewer: true,
						tags: true
					}
				},
				tags: true,
				// If user is logged in, include benchLikes
				benchLikes: session?.user?.id
					? {
							select: { id: true },
							where: {
								userId: session.user.id
							}
						}
					: false
			}
		});

		if (!bench) {
			error(404, 'Bench not found');
		}

		const isLiked = session?.user?.id ? bench.benchLikes.length > 0 : false;

		return {
			reviewed: !!bench.reviews.find((review) => review.reviewer.id === session?.user.id),
			bench,
			isLiked
		};
	}

	error(401, 'No bench specified');
};
