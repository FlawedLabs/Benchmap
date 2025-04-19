import { prismaAdapter } from 'better-auth/adapters/prisma';
import { betterAuth } from 'better-auth';
import prisma from '../prisma';
import nodemailer from 'nodemailer';

export const auth = betterAuth({
	database: prismaAdapter(prisma, {
		provider: 'sqlite'
	}),
	emailAndPassword: {
		enabled: true
	},
	emailVerification: {
		sendVerificationEmail: async ({ user, url, token }, request) => {
			await sendEmail({
				to: user.email,
				subject: 'Welcome to Benchmap - Verify your email',
				text: `Welcome to Benchmap!\n\nPlease verify your email address by clicking this link: ${url}\n\nThis link will expire in 24 hours.\n\nIf you didn't create this account, you can safely ignore this email.`
			});
		}
	},
	socialProviders: {
		github: {
			clientId: process.env.GITHUB_CLIENT_ID as string,
			clientSecret: process.env.GITHUB_CLIENT_SECRET as string
		}
	}
});

async function sendEmail({ to, subject, text }: { to: string; subject: string; text: string }) {
	const transporter = nodemailer.createTransport({
		from: 'no-reply@benchmap.com',
		host: '127.0.0.1',
		port: 1025,
		secure: false
	});
	await transporter.sendMail({ from: 'no-reply@benchmap.com', to, subject, text });
}
