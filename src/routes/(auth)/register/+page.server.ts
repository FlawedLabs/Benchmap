import { UserRegisterSchema } from '$lib/schemas/AuthSchema';
import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';
import * as z from 'zod';
import { auth } from '$lib/server/auth';

export const actions = {
	default: async (event) => {
		const formData = await event.request.formData();

		const formDataObject = Object.fromEntries(formData.entries());

		const result = UserRegisterSchema.safeParse(formDataObject);

		if (!result.success) {
			console.log('error');
			return fail(422, {
				errors: z.treeifyError(result.error),
				formData: formDataObject
			});
		}

		const accountCreationResult = await auth.api.signUpEmail({
			body: {
				email: result.data.email,
				name: result.data.name,
				password: result.data.password
			}
		});

		await auth.api.sendVerificationEmail({
			body: {
				email: result.data.email,
				name: result.data.name,
				token: accountCreationResult.token
			}
		});

		return {
			success: true,
			message: 'Account created successfully'
		};
	}
} satisfies Actions;
