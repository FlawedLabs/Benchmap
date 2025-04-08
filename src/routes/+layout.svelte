<script lang="ts">
	import LangSelect from '$lib/components/LangSelect.svelte';
	import { Toaster } from 'svelte-sonner';
	import '../app.css';
	import ProfilePicture from '$lib/components/ProfilePicture.svelte';

	let { children } = $props();
</script>

<header>
	<nav class="flex items-center justify-end p-4">
		<div>
			<LangSelect lang="fr" />
			<LangSelect lang="en" />
		</div>

		<ProfilePicture />
	</nav>
</header>
<main>
	{@render children()}
	<Toaster />
</main>
