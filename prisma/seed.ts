import { PrismaClient, Color } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
	// Create users
	const users = await Promise.all([
		prisma.user.upsert({
			where: { email: 'maxime@benchmap.com' },
			update: {},
			create: {
				email: 'maxime@benchmap.com',
				name: 'Maxime',
				emailVerified: true,
				image: 'https://avatars.githubusercontent.com/u/1234567'
			}
		}),
		prisma.user.upsert({
			where: { email: 'alice@benchmap.com' },
			update: {},
			create: {
				email: 'alice@benchmap.com',
				name: 'Alice',
				emailVerified: true,
				image: 'https://avatars.githubusercontent.com/u/2345678'
			}
		})
	]);

	// Create tags
	const tags = await Promise.all([
		prisma.tag.upsert({
			where: { name: 'vue-panoramique' },
			update: {},
			create: {
				name: 'vue-panoramique',
				slug: 'vue-panoramique',
				color: Color.blue
			}
		}),
		prisma.tag.upsert({
			where: { name: 'ombragé' },
			update: {},
			create: {
				name: 'ombragé',
				slug: 'ombrage',
				color: Color.green
			}
		}),
		prisma.tag.upsert({
			where: { name: 'calme' },
			update: {},
			create: {
				name: 'calme',
				slug: 'calme',
				color: Color.teal
			}
		}),
		prisma.tag.upsert({
			where: { name: 'romantique' },
			update: {},
			create: {
				name: 'romantique',
				slug: 'romantique',
				color: Color.rose
			}
		})
	]);

	// Create benches
	const benches = await Promise.all([
		prisma.bench.upsert({
			where: { slug: 'banc-parc-bastions' },
			update: {},
			create: {
				title: 'Banc du Parc des Bastions',
				slug: 'banc-parc-bastions',
				latitude: 46.1991,
				longitude: 6.1457,
				address: 'Promenade des Bastions, 1204 Genève',
				openFrom: null, // Open 24/7
				openUntil: null,
				tags: {
					connect: [{ name: 'vue-panoramique' }, { name: 'ombragé' }]
				}
			}
		}),
		prisma.bench.upsert({
			where: { slug: 'banc-jardin-anglais' },
			update: {},
			create: {
				title: 'Banc du Jardin Anglais',
				slug: 'banc-jardin-anglais',
				latitude: 46.2026,
				longitude: 6.1527,
				address: 'Quai du Général-Guisan, 1204 Genève',
				openFrom: '06:00',
				openUntil: '22:00',
				tags: {
					connect: [{ name: 'romantique' }, { name: 'calme' }]
				}
			}
		}),
		prisma.bench.upsert({
			where: { slug: 'banc-parc-mon-repos' },
			update: {},
			create: {
				title: 'Banc du Parc Mon Repos',
				slug: 'banc-parc-mon-repos',
				latitude: 46.2122,
				longitude: 6.1539,
				address: 'Parc Mon Repos, Rue de Lausanne, 1202 Genève',
				openFrom: '07:00',
				openUntil: '20:00',
				tags: {
					connect: [{ name: 'calme' }, { name: 'ombragé' }]
				}
			}
		})
	]);

	// Create reviews
	const reviews = await Promise.all([
		prisma.review.create({
			data: {
				comment:
					"Un banc parfaitement situé avec une vue imprenable sur le parc. L'endroit idéal pour une pause déjeuner au soleil.",
				rating: 4.5,
				reviewer: {
					connect: { id: users[0].id }
				},
				bench: {
					connect: { id: benches[0].id }
				},
				tags: {
					connect: [{ name: 'vue-panoramique' }, { name: 'calme' }]
				}
			}
		}),
		prisma.review.create({
			data: {
				comment: 'Magnifique vue sur le lac, parfait pour les couchers de soleil en amoureux.',
				rating: 5.0,
				reviewer: {
					connect: { id: users[1].id }
				},
				bench: {
					connect: { id: benches[1].id }
				},
				tags: {
					connect: [{ name: 'romantique' }]
				}
			}
		}),
		prisma.review.create({
			data: {
				comment: 'Un havre de paix au milieu du parc. Idéal pour lire un livre.',
				rating: 4.8,
				reviewer: {
					connect: { id: users[0].id }
				},
				bench: {
					connect: { id: benches[2].id }
				},
				tags: {
					connect: [{ name: 'calme' }, { name: 'ombragé' }]
				}
			}
		})
	]);

	// Create likes
	const likes = await Promise.all([
		prisma.benchLike.upsert({
			where: {
				userId_benchId: {
					userId: users[0].id,
					benchId: benches[1].id
				}
			},
			update: {},
			create: {
				user: { connect: { id: users[0].id } },
				bench: { connect: { id: benches[1].id } }
			}
		}),
		prisma.benchLike.upsert({
			where: {
				userId_benchId: {
					userId: users[1].id,
					benchId: benches[0].id
				}
			},
			update: {},
			create: {
				user: { connect: { id: users[1].id } },
				bench: { connect: { id: benches[0].id } }
			}
		}),
		prisma.benchLike.upsert({
			where: {
				userId_benchId: {
					userId: users[1].id,
					benchId: benches[2].id
				}
			},
			update: {},
			create: {
				user: { connect: { id: users[1].id } },
				bench: { connect: { id: benches[2].id } }
			}
		})
	]);

	console.log({ users, tags, benches, reviews, likes });
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
