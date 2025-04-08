<script lang="ts">
	import LangSelect from '$lib/components/LangSelect.svelte';
	import '../app.css';

	let { children } = $props();
</script>

<header>
	<nav>
		<LangSelect lang="fr" />
		<LangSelect lang="en" />
	</nav>
</header>
{@render children()}
