import type { PageServerLoad } from './$types';
import prisma from '$lib/prisma';
import { auth } from '$lib/server/auth';

export const load: PageServerLoad = async ({ request }) => {
	const session = await auth.api.getSession({
		headers: request.headers
	});

	// Maybe redirect I still dunno
	if (!session) {
		return { benches: [] };
	}

	const benches = await prisma.bench.findMany({
		include: {
			tags: true,
			reviews: {
				select: {
					rating: true
				}
			}
		},
		where: {
			benchLikes: {
				some: {
					userId: session?.user.id
				}
			}
		}
	});

	return { benches };
};
