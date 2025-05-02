<script lang="ts" module>
	import type { PageProps } from './$types';
	import { m } from '$lib/paraglide/messages';
	import Map from '$lib/components/Map.svelte';
	import ButtonDropdown from '$lib/components/ButtonDropdown.svelte';
	import { toast } from 'svelte-sonner';
	import * as z from 'zod';
	import { BenchSchema } from '$lib/schemas/BenchSchema';
	import { onMount } from 'svelte';
	import type { BenchFormData } from '$lib/types/BenchTypes';
</script>

<script lang="ts">
	const { data }: PageProps = $props();

	const bench: BenchFormData = $state({
		title: null,
		open_hours: null,
		closing_hours: null,
		location: {
			lat: 0,
			lng: 0
		},
		tags: [],
		userId: null
	});

	let map: Map;

	let center: [number, number] = $state([48.866667, 2.333333]);
	let marker: [number, number] | undefined = $state();

	let isSubmitting = $state(false);
	let errors: z.core.$ZodErrorTree<z.infer<typeof BenchSchema>> | null = $state(null);

	const formValidation = () => {
		const result = BenchSchema.safeParse(bench);

		if (!result.success) {
			errors = z.treeifyError(result.error);
			return false;
		}

		return true;
	};

	onMount(() => {
		if ('geolocation' in navigator) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					marker = [position.coords.latitude, position.coords.longitude];
					map.flyTo(marker);
				},
				() => {
					toast.error(m.geolocation_permission_error());
				}
			);
		} else {
			toast.error(m.geolocation_error());
		}
	});

	const addBench = async () => {
		isSubmitting = true;

		const isValid = formValidation();
		if (!isValid) {
			toast.error(m.bench_error());
			isSubmitting = false;
			return;
		}

		try {
			await fetch(`/api/bench`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(bench)
			});
			toast.success(m.bench_success());
		} catch (error) {
			toast.error(m.bench_error());
			console.error(error);
		} finally {
			isSubmitting = false;
		}
	};

	const toggleTag = (tag: string) => {
		if (bench.tags.some((t) => t.slug === tag)) {
			bench.tags = bench.tags.filter((t) => t.slug !== tag);
		} else {
			bench.tags = [...bench.tags, { slug: tag }];
		}
	};
</script>

<div class="mx-auto max-w-2xl">
	<form class="space-y-4" onsubmit={addBench}>
		<div>
			<label class="mb-1 block text-sm text-gray-700 dark:text-gray-200" for="email"
				>{m.title()}</label
			>
			<input
				bind:value={bench.title}
				required
				id="title"
				type="text"
				placeholder="Banc du parc Paul Mistral"
				class="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:ring-2 focus:ring-black focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:ring-gray-500"
				class:border-red-500={errors?.properties?.title}
			/>
			{#if errors?.properties?.title}
				<p class="text-xs text-red-500">{errors?.properties?.title.errors[0]}</p>
			{/if}
		</div>

		<div class="flex space-x-4">
			<div class="w-1/2">
				<label class="mb-1 block text-sm text-gray-700 dark:text-gray-200" for="open_hours"
					>{m.open_hours()}</label
				>
				<input
					bind:value={bench.open_hours}
					required
					id="open_hours"
					type="time"
					class="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:ring-2 focus:ring-black focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:ring-gray-500"
					class:border-red-500={errors?.properties?.open_hours}
				/>
				{#if errors?.properties?.open_hours}
					<p class="text-xs text-red-500">{errors?.properties?.open_hours.errors[0]}</p>
				{/if}
			</div>
			<div class="w-1/2">
				<label class="mb-1 block text-sm text-gray-700 dark:text-gray-200" for="closing_hours"
					>{m.closing_hours()}</label
				>
				<input
					bind:value={bench.closing_hours}
					required
					id="closing_hours"
					type="time"
					class="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:ring-2 focus:ring-black focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:ring-gray-500"
					class:border-red-500={errors?.properties?.closing_hours}
				/>
				{#if errors?.properties?.closing_hours}
					<p class="text-xs text-red-500">{errors?.properties?.closing_hours.errors[0]}</p>
				{/if}
			</div>
		</div>

		<div>
			<label class="mb-1 block text-sm text-gray-700 dark:text-gray-200" for="closing_hours"
				>{m.location()}</label
			>
			<Map bind:this={map} {center} isMarkerDraggable {marker} />
			{#if errors?.properties?.location}
				<p class="text-xs text-red-500">{errors?.properties?.location.errors[0]}</p>
			{/if}
		</div>

		<div>
			<label class="mb-1 block text-sm text-gray-700 dark:text-gray-200" for="tags">Tags</label>
			<ButtonDropdown width="full">
				{#snippet button()}
					<span
						class="flex w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-left text-gray-900 focus:ring-2 focus:ring-black focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:ring-gray-500"
						class:border-red-500={errors?.properties?.tags}
					>
						{bench.tags.length > 0 ? bench.tags.map((tag) => tag.slug).join(', ') : m.select_tag()}
					</span>
				{/snippet}

				{#snippet dropdownItem()}
					<ul
						class="absolute z-10 mt-1 w-full rounded-lg border border-gray-200 bg-white shadow-md dark:border-gray-600 dark:bg-gray-800"
					>
						{#each data.tags as tag}
							<li
								class="flex items-center px-4 py-2 transition-colors {bench.tags.some(
									(t) => t.slug === tag.slug
								)
									? 'bg-gray-100 dark:bg-gray-700'
									: 'hover:bg-gray-50 dark:hover:bg-gray-700'}"
							>
								<button
									type="button"
									class="flex w-full items-center space-x-2"
									onclick={(event) => {
										event.preventDefault();
										event.stopPropagation();
										toggleTag(tag.slug);
									}}
									onkeydown={(event) => {
										if (event.key === 'Enter' || event.key === ' ') {
											event.preventDefault();
											toggleTag(tag.slug);
										}
									}}
								>
									<span
										class="flex h-5 w-5 items-center justify-center rounded-full border-2 border-gray-300 dark:border-gray-500"
									>
										{#if bench.tags.some((t) => t.slug === tag.slug)}
											<div class="h-3 w-3 rounded-full bg-black dark:bg-white"></div>
										{/if}
									</span>
									<span class="text-sm font-medium text-gray-700 dark:text-gray-200">
										{tag.name}
									</span>
								</button>
							</li>
						{/each}
					</ul>
				{/snippet}
			</ButtonDropdown>
			{#if errors?.properties?.tags}
				<p class="text-xs text-red-500">{errors?.properties?.tags.errors[0]}</p>
			{/if}
		</div>

		<button
			type="submit"
			class="flex w-full cursor-pointer items-center justify-center rounded-md bg-black py-2 text-sm text-white transition hover:opacity-90 dark:bg-gray-700"
			disabled={isSubmitting}
		>
			{#if isSubmitting}
				<svg
					class="mr-2 h-5 w-5 animate-spin text-white"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
				>
					<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"
					></circle>
					<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
					></path>
				</svg>
			{/if}
			{isSubmitting ? m.in_progress() : m.add_bench()}
		</button>
	</form>
</div>
