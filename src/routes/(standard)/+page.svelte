<script lang="ts" module>
	import type { PageProps } from './$types';
</script>

<script lang="ts">
	import { authClient } from '$lib/auth-client';
	import BenchCard from '$lib/components/BenchCard.svelte';

	const { data }: PageProps = $props();
</script>

{#each data.benches as bench}
	<BenchCard {bench} />
{/each}
