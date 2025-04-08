import type { PageServerLoad } from './$types';
import prisma from '$lib/prisma';

export const load: PageServerLoad = async ({ params }) => {
	const { slug } = params;

	console.log('monSlug', slug);

	if (slug) {
		const bench = await prisma.bench.findUnique({
			where: { slug },
			include: {
				reviews: {
					include: {
						reviewer: true,
						tags: true
					}
				}
			}
		});

		console.log('bench', bench);

		return {
			bench
		};
	}

	return {
		bench: null
	};
};
