<script lang="ts">
	import { Toaster } from 'svelte-sonner';
	import '../../app.css';
	import { m } from '$lib/paraglide/messages';
	import Navbar from '$lib/components/Navbar.svelte';
	import type { LayoutProps } from './$types';
	import BottomMenu from '$lib/components/BottomMenu.svelte';

	let { data, children }: LayoutProps = $props();
</script>

<svelte:head>
	<title>Benchmap 🪑</title>
	<meta name="description" content={m.app_description()} />
	<link rel="icon" href="/favicon.png" />
	<link rel="apple-touch-icon" href="/favicon.png" />
	<link rel="manifest" href="/manifest.json" />
	<meta name="theme-color" content="#ffffff" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
</svelte:head>

<header>
	<Navbar user={data.session?.user} />
</header>

<main class="mt-24 pb-[72px]">
	{@render children()}
	<Toaster richColors />
</main>

<footer>
	<BottomMenu user={data.session?.user} />
</footer>
