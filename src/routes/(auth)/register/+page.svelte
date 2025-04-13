<script lang="ts">
	import { enhance } from '$app/forms';
	import SocialButton from '$lib/components/SocialButton.svelte';
	import { m } from '$lib/paraglide/messages';
	import { UserRegisterSchema } from '$lib/schemas/AuthSchema';
	import * as z from 'zod';
	import {} from 'zod';

	let email = $state('');
	let password = $state('');
	let name = $state('');

	// Should be working for now :)
	let errors: z.core.$ZodErrorTree<z.infer<typeof UserRegisterSchema>> | null = $state(null);

	let imageLoaded = $state(false);

	const signup = async (e: SubmitEvent) => {
		const isValid = formValidation();

		if (!isValid) {
			return;
		}
	};

	const formValidation = () => {
		const result = UserRegisterSchema.safeParse({
			email,
			password,
			name
		});

		if (!result.success) {
			errors = z.treeifyError(result.error);
			console.log(errors);
			return false;
		}

		return true;
	};
</script>

<div class="flex h-screen items-center justify-center overflow-hidden">
	<div class="flex h-full w-full flex-col overflow-hidden bg-white md:flex-row">
		<div class="flex flex-2/5 flex-col justify-center p-10">
			<h2 class="mb-1 text-center text-2xl font-semibold text-gray-900">{m.sign_up()}</h2>
			<p class="mb-8 text-center text-sm text-gray-500">
				{m.catch_phrase()}
			</p>

			<form class="space-y-4" method="POST" onsubmit={signup} use:enhance>
				<div class="space-y-1">
					<label class="block text-sm text-gray-700" for="email">Email</label>
					<input
						bind:value={email}
						required
						id="email"
						type="email"
						placeholder="your@email.com"
						class="w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-black focus:outline-none"
						class:border-red-500={errors?.properties?.email}
					/>
					{#if errors?.properties?.email}
						<p class="text-xs text-red-500">{errors?.properties?.email.errors[0]}</p>
					{/if}
				</div>

				<div class="space-y-1">
					<label class="text-sm text-gray-700" for="username">{m.username()}</label>
					<input
						bind:value={name}
						required
						id="username"
						type="text"
						placeholder="John Doe"
						class="w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-black focus:outline-none"
						class:border-red-500={errors?.properties?.name}
					/>
					{#if errors?.properties?.name}
						<p class="text-xs text-red-500">{errors?.properties?.name.errors[0]}</p>
					{/if}
				</div>

				<div class="space-y-1">
					<label class="text-sm text-gray-700" for="password">{m.password()}</label>
					<input
						bind:value={password}
						required
						id="password"
						type="password"
						class="w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-black focus:outline-none"
						class:border-red-500={errors?.properties?.password}
					/>
					{#if errors?.properties?.password}
						<p class="text-xs text-red-500">{errors?.properties?.password.errors[0]}</p>
					{/if}
				</div>

				<button
					type="submit"
					class="w-full cursor-pointer rounded-md bg-black bg-gradient-to-r py-2 text-sm text-white transition hover:opacity-90"
				>
					{m.sign_up()}
				</button>

				<div class="flex items-center justify-between">
					<hr class="w-full border-gray-300" />
					<span class="mx-2 text-sm text-gray-500">{m.or()}</span>
					<hr class="w-full border-gray-300" />
				</div>

				<SocialButton provider="github" />
			</form>

			<p class="mt-6 text-center text-sm text-gray-500">
				{m.already_have_account()}
				<a href="/signin" class="font-medium text-black hover:underline">{m.sign_in()}</a>
			</p>
		</div>

		<!-- @TODO Make it dynamic -->
		<div class="relative hidden flex-3/5 bg-gray-100 md:flex">
			{#if !imageLoaded}
				<!-- Maybe we could try to use Blurha.sh here, not sure about how it works tho :) -->
				<div class="absolute inset-0 animate-pulse bg-gray-200"></div>
			{/if}
			<img
				loading="eager"
				decoding="async"
				fetchpriority="high"
				src="https://images.unsplash.com/photo-1542797515-b961dedd34bc?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
				alt="Illustration"
				class="h-full w-full object-cover transition-opacity duration-1000"
				class:opacity-0={!imageLoaded}
				onload={() => (imageLoaded = true)}
			/>
		</div>
	</div>
</div>
