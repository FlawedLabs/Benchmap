<script lang="ts" module>
	import { env } from '$env/dynamic/public';
	import 'leaflet/dist/leaflet.css';
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import type * as Leaflet from 'leaflet';

	type IProps = {
		center: [number, number];
		marker?: [number, number];
		isMarkerDraggable?: boolean;
	};
</script>

<script lang="ts">
	let { isMarkerDraggable, center, marker }: IProps = $props();

	export const flyTo = (latlng: [number, number]) => {
		if (mapInstance) {
			mapInstance.flyTo(latlng, 13);
			createMarker(latlng);
		}
	};

	const dynamicImportLeaflet: Promise<typeof Leaflet> = browser
		? import('leaflet').then((module) => module.default)
		: new Promise(() => {});

	let mapContainer: HTMLElement; // The map container
	let mapInstance: Leaflet.Map; // The map instance
	let markers: Leaflet.Marker[] = []; // The markers on the map
	let L: typeof Leaflet;

	onMount(async () => {
		if (browser) {
			L = await dynamicImportLeaflet;
			mapInstance = L.map(mapContainer).setView([51.505, -0.09], 13);
			L.tileLayer(
				`https://api.mapbox.com/styles/v1/kayoshi-dev/ckzlajhj3001o14o8wcf9jcd8/tiles/256/{z}/{x}/{y}@2x?access_token=${env.PUBLIC_MAPBOX_TOKEN}`,
				{
					attribution:
						'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				}
			).addTo(mapInstance);
			mapInstance.setView(center, 11);
			if (marker) {
				createMarker(marker);
			}
		}
	});

	const createMarker = (latlng: Leaflet.LatLngTuple | Leaflet.LatLng) => {
		const newMarker = L.marker(latlng, { draggable: isMarkerDraggable });
		markers.push(newMarker);
		newMarker.addTo(mapInstance);
	};
</script>

{#await dynamicImportLeaflet}
	<div role="status" class="my-2 animate-pulse">
		<div class="h-96 w-full rounded-md bg-gray-200 dark:bg-gray-700"></div>
	</div>
{:then}
	<div class="relative z-0 my-2 h-96 w-full rounded-md" bind:this={mapContainer}></div>
{:catch error}
	<p>Something went wrong: {error.message}</p>
{/await}
