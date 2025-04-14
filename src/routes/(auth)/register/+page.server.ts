import { UserRegisterSchema } from '$lib/schemas/AuthSchema';
import type { Actions } from './$types';

export const actions = {
	default: async (event) => {
		const formData = await event.request.formData();

		const formDataObject = Object.fromEntries(formData.entries());

		const result = UserRegisterSchema.safeParse(formDataObject);

		console.log(result);
	}
} satisfies Actions;
