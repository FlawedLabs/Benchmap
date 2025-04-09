<script lang="ts">
	import LangSelect from '$lib/components/LangSelect.svelte';
	import { Toaster } from 'svelte-sonner';
	import '../app.css';
	import ProfilePicture from '$lib/components/ProfilePicture.svelte';
	import { authClient } from '$lib/auth-client';
	import { m } from '$lib/paraglide/messages';

	let { children } = $props();

	const session = authClient.useSession();
</script>

<svelte:head>
	<title>Benchmap 🪑</title>
	<meta name="description" content={m.app_description()} />
	<link rel="icon" href="/favicon.png" />
	<link rel="apple-touch-icon" href="/favicon.png" />
	<link rel="manifest" href="/manifest.webmanifest" />
	<meta name="theme-color" content="#ffffff" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
</svelte:head>

<header>
	<nav class="flex items-center justify-end p-4">
		<div>
			<LangSelect lang="fr" />
			<LangSelect lang="en" />
		</div>

		{#if $session?.data?.user}
			<ProfilePicture src={$session.data.user.image} />
		{:else}
			<span>{m.sign_in()}</span>
		{/if}
	</nav>
</header>
<main>
	{@render children()}
	<Toaster richColors />
</main>
