import type { PageServerLoad } from './$types';
import prisma from '$lib/prisma';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params }) => {
	const { slug } = params;

	if (slug) {
		const benches = await prisma.bench.findMany({
			where: { tags: { some: { slug } } }
		});

		console.log(benches);

		return {
			benches
		};
	}

	error(401, 'No tag specified');
};
