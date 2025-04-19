import type { PageServerLoad } from './$types';
import prisma from '$lib/prisma';

export const load: PageServerLoad = async () => {

    const tags = await prisma.tag.findMany();

    return {
        tags
    };
};
