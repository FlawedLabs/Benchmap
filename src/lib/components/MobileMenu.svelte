<script lang="ts" module>
	import { m } from '$lib/paraglide/messages';
	import { X, Menu } from '@lucide/svelte';
	import { fade, slide } from 'svelte/transition';
	import LangPicker from './LangPicker.svelte';
	import ProfilePicture from './ProfilePicture.svelte';
	import type { User } from 'better-auth';

	type IProps = {
		isMenuOpen: boolean;
		user: User | undefined;
	};
</script>

<script lang="ts">
	let { isMenuOpen = $bindable(), user }: IProps = $props();
</script>

<button
	onclick={() => (isMenuOpen = !isMenuOpen)}
	class="rounded-lg p-2 hover:bg-gray-100 md:hidden"
	aria-label="Toggle menu"
>
	{#if isMenuOpen}
		<X size={24} />
	{:else}
		<Menu size={24} />
	{/if}
</button>

{#if isMenuOpen}
	<!-- Overlay -->
	<div
		class="fixed inset-0 z-[100] min-h-screen bg-black/20 backdrop-blur-sm md:hidden"
		onclick={() => (isMenuOpen = false)}
		transition:fade={{ duration: 200 }}
		role="dialog"
		aria-modal="true"
		aria-hidden="true"
	></div>

	<!-- Menu -->
	<div
		class="fixed top-0 right-0 bottom-0 z-[101] min-h-screen w-64 bg-white shadow-xl md:hidden"
		transition:slide={{ duration: 200, axis: 'x' }}
	>
		<button
			onclick={() => (isMenuOpen = false)}
			class="absolute top-4 right-4 rounded-lg p-2 hover:bg-gray-100"
			aria-label="Close menu"
		>
			<X size={24} />
		</button>

		<div class="flex h-full flex-col gap-4 p-6 pt-16">
			<div class="flex">
				<!-- It appears under the profile picture gonna kms -->
				<LangPicker />
			</div>
			{#if user}
				<div class="flex">
					<ProfilePicture src={user.image} />
				</div>
			{:else}
				<div class="flex flex-col gap-2">
					<a
						href="/register"
						class="w-full rounded-md p-2 text-center text-sm font-medium text-gray-700 hover:bg-gray-100"
					>
						{m.sign_up()}
					</a>
					<a
						href="/login"
						class="w-full rounded-lg bg-gray-900 px-4 py-2 text-center text-sm font-medium text-white hover:bg-gray-800"
					>
						{m.sign_in()}
					</a>
				</div>
			{/if}
		</div>
	</div>
{/if}
