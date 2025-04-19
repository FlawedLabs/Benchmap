import { UserRegisterSchema } from '$lib/schemas/AuthSchema';
import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';
import * as z from 'zod';

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

		console.log(result);
	}
} satisfies Actions;
