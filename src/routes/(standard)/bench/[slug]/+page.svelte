<script lang="ts" module>
	import Like from '$lib/components/Like.svelte';
	import Map from '$lib/components/Map.svelte';
	import Review from '$lib/components/Review.svelte';
	import { ArrowLeft, ArrowUpRight, Share } from '@lucide/svelte';
	import { toast } from 'svelte-sonner';
	import type { PageProps } from './$types';
	import DistanceEstimation from '$lib/components/DistanceEstimation.svelte';
	import { m } from '$lib/paraglide/messages';
	import Rating from '$lib/components/Rating.svelte';
	import Slider from '$lib/components/Slider.svelte';
	import { onMount } from 'svelte';
	import { animate, stagger } from 'animejs';
</script>

<script lang="ts">
	const { data }: PageProps = $props();

	let benchContainer: HTMLDivElement | null = null;

	onMount(() => {
		if (!benchContainer) return;

		animate(benchContainer.children, {
			opacity: [0, 1],
			duration: stagger(500, { start: 500 }),
			easing: 'easeInOutQuad'
		});
	});

	const copyInClipboard = () => {
		if (navigator.clipboard) {
			navigator.clipboard.writeText(window.location.href);
			toast.success('Lien copié dans le presse-papier');
		} else {
			toast.error('Impossible de copier le lien');
		}
	};
</script>

<svelte:head>
	<title>Benchmap - {data.bench?.title}</title>
	<meta
		name="description"
		content="Découvrez le banc {data.bench?.title} situé à {data.bench?.address}."
	/>
</svelte:head>

<div class="mx-auto max-w-2xl" bind:this={benchContainer}>
	<div class="relative">
		<Slider />
		<a href="/" class="absolute top-4 left-4 rounded-full bg-white p-2 shadow">
			<ArrowLeft size={16} />
		</a>
		<div class="absolute top-4 right-4 flex gap-2">
			<Like isLiked={data.isLiked} />
			<button
				onclick={copyInClipboard}
				class="cursor-pointer rounded-full bg-white p-2 shadow transition-all active:scale-95"
			>
				<Share size={16} />
			</button>
		</div>
	</div>

	<div class="p-4">
		<h1 class="text-xl font-semibold text-gray-900">{data.bench?.title}</h1>
		<p class="text-sm text-gray-500">{data.bench?.address}</p>

		<div class="mt-2 flex items-center text-sm text-gray-600">
			<span class="flex items-center font-semibold text-green-600">
				<span class="font-semibold text-green-600">● {m.bench_state_open()}</span>
			</span>
			<span class="mx-2">•</span>

			<DistanceEstimation latitude={data.bench?.latitude} longitude={data.bench?.longitude} />
		</div>

		<div class="mt-4 flex flex-wrap gap-2">
			{#each data.bench?.tags as tag}
				<span class="rounded-full bg-{tag.color}-100 px-3 py-1 text-sm text-{tag.color}-800"
					>{tag.name}</span
				>
			{/each}
			<span class="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-800"
				>Voir les plages horaires</span
			>
		</div>

		{#if data.bench?.reviews.length > 0}
			<div class="mt-4 flex items-center justify-between text-sm text-gray-700">
				<span
					>Évalué par <strong>{data.bench?.reviews[0].reviewer.name}</strong>

					{#if data.bench?.reviews.length >= 2}
						& {data.bench?.reviews.length - 1} personne{#if data.bench?.reviews.length > 2}s{/if}
					{/if}</span
				>
				<Rating ratings={data.bench?.reviews.map((review) => review.rating)} />
			</div>
		{:else}
			Soyez le premier à laisser un avis !
		{/if}

		<div class="mt-4 grid gap-4 sm:grid-cols-2">
			{#if data.bench}
				{#each data.bench.reviews as review}
					<Review
						profileSrc={review.reviewer.image}
						reviewerName={review.reviewer.name}
						comment={review.comment}
						createdAt={new Date(review.createdAt)}
						tags={review.tags}
					/>
				{/each}
			{/if}
		</div>
	</div>

	<Map
		center={[data.bench?.latitude, data?.bench.longitude]}
		marker={[data.bench?.latitude, data?.bench.longitude]}
	/>

	<div class="fixed inset-x-0 bottom-0 border-t bg-white p-3 sm:static sm:border-none sm:p-0">
		<button
			class="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-black py-3 text-lg text-white transition-all hover:scale-[0.98]"
		>
			Y aller <ArrowUpRight />
		</button>
	</div>
</div>
