<script lang="ts" module>
	import BenchCard from '$lib/components/BenchCard.svelte';
	import { m } from '$lib/paraglide/messages';
	import { User, MapPin, ThumbsUp, MessageSquare } from '@lucide/svelte';
	import type { PageProps } from './$types';
	import { onMount } from 'svelte';
</script>

<script lang="ts">
	const { data }: PageProps = $props();

	onMount(() => {
		console.log(data);
	});
</script>

<div class="container mx-auto max-w-6xl px-4 py-8">
	<div class="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center">
		<div class="relative h-24 w-24 overflow-hidden rounded-full">
			{#if data.user.image}
				<img src={data.user.image} alt={data.user.name} class="h-full w-full object-cover" />
			{:else}
				<div class="flex h-full w-full items-center justify-center bg-gray-200 dark:bg-gray-700">
					<User size={32} class="text-gray-400 dark:text-gray-500" />
				</div>
			{/if}
		</div>

		<div class="flex flex-col">
			<h1 class="text-2xl font-bold text-gray-900 dark:text-white">
				{data.user.name}
			</h1>
			<p class="text-sm text-gray-500 dark:text-gray-400">
				{m.member_since()}
				{new Date(data.user.createdAt).toLocaleDateString()}
			</p>
		</div>
	</div>

	<div class="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
		<div class="rounded-lg bg-white p-4 shadow dark:bg-gray-800">
			<div class="flex items-center gap-2">
				<MapPin class="text-blue-500" size={20} />
				<h2 class="font-semibold text-gray-900 dark:text-white">{m.benches_added()}</h2>
			</div>
			<p class="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
				{data.user.stats.benches}
			</p>
		</div>

		<div class="rounded-lg bg-white p-4 shadow dark:bg-gray-800">
			<div class="flex items-center gap-2">
				<ThumbsUp class="text-green-500" size={20} />
				<h2 class="font-semibold text-gray-900 dark:text-white">{m.likes_count()}</h2>
			</div>
			<p class="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
				{data.user.stats.benchLikes}
			</p>
		</div>

		<div class="rounded-lg bg-white p-4 shadow dark:bg-gray-800">
			<div class="flex items-center gap-2">
				<MessageSquare class="text-purple-500" size={20} />
				<h2 class="font-semibold text-gray-900 dark:text-white">{m.reviews_written()}</h2>
			</div>
			<p class="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
				{data.user.stats.reviews}
			</p>
		</div>
	</div>

	{#if data.user.benches?.length > 0}
		<h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">{m.added_benches()}</h2>
		<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
			{#each data.user.benches as bench}
				<BenchCard {bench} />
			{/each}
		</div>
	{:else}
		<div class="rounded-lg bg-gray-50 p-8 text-center dark:bg-gray-800">
			<p class="text-gray-600 dark:text-gray-400">{m.no_benches_added()}</p>
		</div>
	{/if}
</div>
