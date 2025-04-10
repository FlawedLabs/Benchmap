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
				<span>{m.sign_in()}</span>
			{/if}
		</div>
	{/if}
</nav>
