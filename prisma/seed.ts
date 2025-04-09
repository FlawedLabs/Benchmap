import { PrismaClient, Color } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
	// Create users
	const maxime = await prisma.user.upsert({
		where: { email: 'maxime@benchmap.com' },
		update: {},
		create: {
			email: 'maxime@benchmap.com',
			name: 'Maxime',
			emailVerified: true,
			image: 'https://avatars.githubusercontent.com/u/1234567'
		}
	});

	// Create tags
	const tags = await Promise.all([
		prisma.tag.upsert({
			where: { name: 'vue-panoramique' },
			update: {},
			create: { name: 'vue-panoramique', slug: 'vue-panoramique', color: Color.blue }
		}),
		prisma.tag.upsert({
			where: { name: 'ombragé' },
			update: {},
			create: { name: 'ombragé', slug: 'ombrage', color: Color.green }
		}),
		prisma.tag.upsert({
			where: { name: 'calme' },
			update: {},
			create: { name: 'calme', slug: 'calme', color: Color.teal }
		})
	]);

	// Create benches
	const bastionsBench = await prisma.bench.upsert({
		where: { slug: 'banc-parc-bastions' },
		update: {},
		create: {
			title: 'Banc du Parc des Bastions',
			slug: 'banc-parc-bastions',
			latitude: 46.1991,
			longitude: 6.1457,
			address: 'Promenade des Bastions, 1204 Genève',
			openingHours: '24/7',
			rating: 4.5,
			tags: {
				connect: [{ name: 'vue-panoramique' }, { name: 'ombragé' }]
			}
		}
	});

	// Create reviews
	const review = await prisma.review.create({
		data: {
			comment:
				"Un banc parfaitement situé avec une vue imprenable sur le parc. L'endroit idéal pour une pause déjeuner au soleil.",
			rating: 4.5,
			reviewer: {
				connect: { id: maxime.id }
			},
			bench: {
				connect: { id: bastionsBench.id }
			},
			tags: {
				connect: [{ name: 'vue-panoramique' }, { name: 'calme' }]
			}
		}
	});

	console.log({ maxime, tags, bastionsBench, review });
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
