import prisma from '$lib/prisma';
import { auth } from '$lib/server/auth';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ request }) => {
	const session = await auth.api.getSession({
		headers: request.headers
	});

	const tags = await prisma.tag.findMany({
		take: 10,
		include: {
			_count: {
				select: {
					benches: true
				}
			}
		}
	});

	return {
		session,
		tags
	};
};
