<script lang="ts" module>
	import type { PageProps } from './$types';
	import BenchCard from '$lib/components/BenchCard.svelte';
</script>

<script lang="ts">
	const { data }: PageProps = $props();
</script>

{#each data.benches as bench}
	<BenchCard {bench} />
{/each}
