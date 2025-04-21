import prisma from '$lib/prisma';
import { BenchSchema } from '$lib/schemas/BenchSchema.js';
import type { BenchFormData } from '$lib/types/BenchTypes.js';
import { error, json } from '@sveltejs/kit';
import { toast } from 'svelte-sonner';

export async function POST({ request }) {
	try {
		const bench: BenchFormData = await request.json();

		const response = await fetch(
			`https://nominatim.openstreetmap.org/reverse?format=json&lat=${bench.location.lat}&lon=${bench.location.lng}`
		);
		const geocodeData = await response.json();

		if (!geocodeData.address) {
			throw error(400, 'Unable to fetch address from coordinates');
		}

		// Quick validation to check if the sent data is valid, need to improve with a true error lol
		const result = BenchSchema.safeParse(bench);

		if (!result.success) {
			throw error(422);
		}

		console.log(geocodeData);

		const newBench = await prisma.bench.create({
			data: {
				title: result.data.title,
				slug: result.data.title.toLowerCase().replace(/\s+/g, '-') + '-' + Date.now(),
				openFrom: result.data.open_hours,
				openUntil: result.data.closing_hours,
				latitude: result.data.location.lat,
				longitude: result.data.location.lng,
				address:
					geocodeData.address.road +
					', ' +
					geocodeData.address.postcode +
					', ' +
					geocodeData.address.city,
				tags: {
					connect: [...result.data.tags]
				}
			},
			include: {
				tags: true
			}
		});
		return json({ success: true, newBench });
	} catch (e: any) {
		console.log(e);
		toast.error('Error creating bench');
		throw error(500, 'Internal server error');
	}
}
