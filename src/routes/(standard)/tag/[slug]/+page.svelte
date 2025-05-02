<script lang="ts" module>
	import type { PageProps } from './$types';
</script>

<script lang="ts">
	import BenchCard from '$lib/components/BenchCard.svelte';

	const { data }: PageProps = $props();
</script>

{#each data.benches as bench}
	<BenchCard {bench} />
{/each}

{#if data.benches.length === 0}
	<p>No benches found.</p>
{/if}
