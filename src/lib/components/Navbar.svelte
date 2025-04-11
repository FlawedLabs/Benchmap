<script lang="ts" module>
	import { m } from '$lib/paraglide/messages';
	import type { User } from 'better-auth';
	import LangPicker from './LangPicker.svelte';
	import ProfilePicture from './ProfilePicture.svelte';

	type IProps = {
		user: User | undefined;
		isFull?: boolean;
	};
</script>

<script lang="ts">
	let { user, isFull = true }: IProps = $props();
</script>

<nav class="fixed top-0 flex max-h-16 w-screen items-center justify-between p-4">
	<h1 class="text-2xl font-bold text-gray-900">
		<a href="/">Benchmap</a>
	</h1>

	{#if isFull}
		<div class="flex items-center gap-2">
			<LangPicker />

			{#if user}
				<ProfilePicture src={user.image} />
			{:else}
				<a
					href="/register"
					class="text-dark-600 hover:text-dark-800 rounded-md p-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 focus:ring-2"
				>
					{m.sign_up()}
				</a>
				<a
					href="/login"
					class="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-gray-800 hover:shadow-md active:scale-95 active:transform"
				>
					{m.sign_in()}
				</a>
			{/if}
		</div>
	{/if}
</nav>
