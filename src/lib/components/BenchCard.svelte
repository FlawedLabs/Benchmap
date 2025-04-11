<script lang="ts" module>
	import { Share } from '@lucide/svelte';
	import Slider from '$lib/components/Slider.svelte';
	import { Prisma } from '@prisma/client';
	import DistanceEstimation from './DistanceEstimation.svelte';
	import { onMount } from 'svelte';
	import { animate } from 'animejs';
	import Rating from './Rating.svelte';

	type IProps = {
		// This tell Prisma that we want to include the tags and reviews relations in the bench object
		// as it's not included by default
		bench: Prisma.BenchGetPayload<{
			include: { tags: true; reviews: { select: { rating: true } } };
		}>;
	};
</script>

<script lang="ts">
	import { getCurrentHours } from '$lib/utils/Date';
	import OpeningState from './OpeningState.svelte';

	let { bench }: IProps = $props();

	let benchContainer: HTMLAnchorElement | null = $state(null);

	onMount(() => {
		startAnimation();
	});

	const startAnimation = () => {
		if (benchContainer) {
			animate(benchContainer, {
				opacity: [0, 1],
				duration: 750,
				easing: 'easeInOutQuad',
				translateY: ['0px', '-20px']
			});
		}
	};
</script>

<a
	href={`/bench/${bench.slug}`}
	bind:this={benchContainer}
	class="mx-auto my-6 block max-w-lg overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-md transition-shadow hover:shadow-lg"
>
	<div class="relative">
		<Slider />
		<span class="absolute top-2 left-2 rounded-full bg-white px-2 py-1 text-sm text-gray-700 shadow"
			>En vedette ✨</span
		>
		<button
			class="absolute top-2 right-2 rounded-full bg-white p-1 shadow"
			onclick={(e) => e.preventDefault()}
		>
			<Share size={16} />
		</button>
	</div>
	<div class="p-4">
		<div class="mb-1 flex items-center text-sm text-gray-500">
			<OpeningState {bench} currentHours={getCurrentHours()} />
			<!-- <span class="font-semibold text-green-600">● Ouvert</span> -->
			<span class="mx-2">•</span>
			<DistanceEstimation latitude={bench.latitude} longitude={bench.longitude} />
		</div>

		<h2 class="text-lg font-semibold text-gray-900">{bench.title}</h2>
		<p class="text-sm text-gray-500">{bench.address}</p>

		<div class="mt-3 flex flex-wrap gap-2">
			{#each bench.tags as tag}
				<span class="rounded-full bg-{tag.color}-100 px-3 py-1 text-sm text-gray-700"
					>{tag.name}</span
				>
			{/each}
			<button class="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700"
				>Voir les plages horaires
			</button>
		</div>

		<div class="mt-3 text-sm font-medium text-gray-700">
			<Rating ratings={bench.reviews.map((review) => review.rating)} />
		</div>
	</div>
</a>
