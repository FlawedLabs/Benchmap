<script lang="ts" module>
</script>

<script lang="ts">
	import BenchCard from '$lib/components/BenchCard.svelte';

	import type { PageProps } from './$types';

	const { data }: PageProps = $props();
</script>

{#each data.benches as bench}
	<BenchCard {bench} />
{:else}
	<p class="text-center text-gray-500">Start exploring now!</p>
{/each}
