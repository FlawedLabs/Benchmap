import type { PageServerLoad } from './$types';
import prisma from '$lib/prisma';

export const load: PageServerLoad = async () => {
	const benches = await prisma.bench.findMany({
		include: {
			tags: true,
			reviews: {
				select: {
					rating: true
				}
			}
		}
	});

	return { benches };
};
