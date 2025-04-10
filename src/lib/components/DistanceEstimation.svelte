<script lang="ts" module>
	import { fade } from 'svelte/transition';
	import { m } from '$lib/paraglide/messages';
	import { onMount } from 'svelte';
	import { toast } from 'svelte-sonner';

	type IProps = {
		latitude: number;
		longitude: number;
		// Maybe we could pass the distance, so if it's already calculated, we don't need to recalculate it
		// distance: number;
	};
</script>

<script lang="ts">
	const { latitude, longitude }: IProps = $props();

	let distance: number = $state(0);
	let isLoading: boolean = $state(true);

	const estimateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
		const R = 6371; // Radius of the Earth in km
		const dLat = (lat2 - lat1) * (Math.PI / 180);
		const dLon = (lon2 - lon1) * (Math.PI / 180);
		const a =
			Math.sin(dLat / 2) * Math.sin(dLat / 2) +
			Math.cos(lat1 * (Math.PI / 180)) *
				Math.cos(lat2 * (Math.PI / 180)) *
				Math.sin(dLon / 2) *
				Math.sin(dLon / 2);
		const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
		return R * c;
	};

	onMount(() => {
		// This is triggered for each instance of the component, and only the last authorization popup works.
		// Should probably ask the permission somewhere else (in a parent component)
		if ('geolocation' in navigator) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					distance = parseFloat(
						estimateDistance(
							latitude,
							longitude,
							position.coords.latitude,
							position.coords.longitude
						).toFixed(2)
					);

					console.info('Geolocation is available');
					console.info(`Distance: ${distance}km`);

					isLoading = false;
				},
				() => {
					toast.error(m.geolocation_permission_error());
				}
			);
		} else {
			toast.error(m.geolocation_error());
		}
	});
</script>

<div class="relative h-4 w-16">
	{#if isLoading}
		<div
			transition:fade={{ duration: 150 }}
			class="absolute inset-0 animate-pulse rounded-full bg-gray-200"
		></div>
	{:else}
		<span
			class="absolute inset-0 flex items-center text-sm"
			transition:fade={{ delay: 150, duration: 150 }}>{distance}km</span
		>
	{/if}
</div>
