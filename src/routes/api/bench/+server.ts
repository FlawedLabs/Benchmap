import prisma from "$lib/prisma";
import { error, json } from "@sveltejs/kit";
import { toast } from 'svelte-sonner';

export async function POST({ params, request }) {

    try {
        const bench = await request.json();

        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${bench.location.lat}&lon=${bench.location.lng}`);
        const geocodeData = await response.json();

        if (!geocodeData.address) {
            throw error(400, 'Unable to fetch address from coordinates');
        }

        console.log(geocodeData)

        const result = await prisma.bench.create({
            data: {
                title: bench.title,
                slug: bench.title.toLowerCase().replace(/\s+/g, '-') + '-' + Date.now(),
                openFrom: bench.open_hours,
                openUntil: bench.closing_hours,
                latitude: bench.location.lat,
                longitude: bench.location.lng,
                address: geocodeData.address.road + ', ' + geocodeData.address.postcode + ', ' + geocodeData.address.city,
                tags: {
                    connect: [
                        ...bench.tags
                    ],
                }
            },
            include: {
                tags: true,
            },
        })
        return json({ success: true, result });
    } catch (e: any) {
        console.log(e)
        toast.error('Error creating bench');
        throw error(500, 'Internal server error');
    }
}
