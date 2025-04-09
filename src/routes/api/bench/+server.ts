import { json } from '@sveltejs/kit';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export async function GET() {
	const benches = await prisma.bench.findMany({
		include: {
			tags: true
		}
	});

	return json(benches);
}
