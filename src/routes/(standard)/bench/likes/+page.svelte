<script lang="ts" module>
	import BenchCard from '$lib/components/BenchCard.svelte';
</script>

<script lang="ts">
	import type { PageProps } from './$types';

	const { data }: PageProps = $props();
</script>

{#if data.session}
	{#each data.benches as bench}
		<BenchCard {bench} />
	{:else}
		<p class="text-center text-gray-500">Start exploring now!</p>
	{/each}
{:else}
	<p class="text-center text-gray-500">You need to be logged in to see your benches.</p>
{/if}
