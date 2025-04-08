import type { PageServerLoad } from './$types';
import prisma from '$lib/prisma';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params }) => {
	const { slug } = params;

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

		if (!bench) {
			throw error(404, 'Bench not found');
		}

		return {
			bench
		};
	}

	error(401, 'No bench specified');
};
