<script lang="ts">
	import { Toaster } from 'svelte-sonner';
	import '../../app.css';
	import { authClient } from '$lib/auth-client';
	import { m } from '$lib/paraglide/messages';
	import Navbar from '$lib/components/Navbar.svelte';

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
	<Navbar user={$session?.data?.user} isFull={false} />
</header>
<main>
	{@render children()}
	<Toaster richColors />
</main>
