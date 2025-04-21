import prisma from "$lib/prisma";
import { error, json } from "@sveltejs/kit";
import { toast } from 'svelte-sonner';

export async function POST({ params, request }) {

    try {
        const data = await request.json();
        const result = await prisma.review.create({
            data: {
                comment: data.review,
                rating: data.rating,
                reviewer: {
                    connect: {
                        id: data.userId
                    }
                },
                bench: {
                    connect: {
                        id: data.benchId
                    }
                },
            }
        })
        return json({ success: true, result });
    } catch (e: any) {
        console.log(e)
        toast.error('Error adding review');
        throw error(500, 'Internal server error');
    }
}
