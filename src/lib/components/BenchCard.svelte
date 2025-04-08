<script lang="ts">
	import { Share } from '@lucide/svelte';
	import Slider from '$lib/components/Slider.svelte';
	import { onMount } from 'svelte';
	import type { Bench } from '@prisma/client';

	let benches: Bench[] = $state([]);

	const getBenches = async () => {
		const response = await fetch('/api/bench');
		benches = await response.json();
	};

	onMount(() => {
		getBenches();
	});
</script>

{#each benches as bench, i}
	<div
		class="mx-auto max-w-lg my-6 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-md"
	>
		<div class="relative">
			<Slider />
			{#if i === 0}
				<span
					class="absolute top-2 left-2 rounded-full bg-white px-2 py-1 text-sm text-gray-700 shadow">En vedette ✨</span>
			{/if}
			<button class="absolute top-2 right-2 rounded-full bg-white p-1 shadow">
				<Share size={16} />
			</button>
		</div>
		<div class="p-4">
			<div class="mb-1 flex items-center text-sm text-gray-500">
				<span class="font-semibold text-green-600">● Ouvert</span>
				<span class="mx-2">•</span>
				<span>320 m</span>
			</div>

		<h2 class="text-lg font-semibold text-gray-900">{bench.title}, Paris</h2>
		<p class="text-sm text-gray-500">{bench.address}</p>

		<div class="mt-3 flex flex-wrap gap-2">
			{#each bench.tags as tag}
					<span
						class="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700"
					>{tag.name}</span
					>
			{/each}
			<button class="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700"
				>Voir les plages horaires</button
			>
		</div>

		<div class="mt-3 text-sm font-medium text-gray-700">★ 4,68</div>
	</div>
</div>
{/each}
