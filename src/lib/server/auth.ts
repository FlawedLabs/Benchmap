import { prismaAdapter } from 'better-auth/adapters/prisma';
import { betterAuth } from 'better-auth';
import prisma from './prisma';

export const auth = betterAuth({
	database: prismaAdapter(prisma, {
		provider: 'sqlite'
	}),
	emailAndPassword: {
		enabled: true
	},
	socialProviders: {
		github: {
			clientId: process.env.GITHUB_CLIENT_ID as string,
			clientSecret: process.env.GITHUB_CLIENT_SECRET as string
		}
	}
});
