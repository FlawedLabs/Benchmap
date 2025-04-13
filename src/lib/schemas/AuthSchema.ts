import * as z from 'zod';

export const UserRegisterSchema = z.interface({
	email: z.email(),
	name: z.string().min(1).max(32),
	password: z.string().min(8).max(32)
});

const UserLoginSchema = z.interface({
	email: z.email(),
	password: z.string().min(8).max(32)
});
