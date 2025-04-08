<script lang="ts">
	import { Share } from '@lucide/svelte';
	import Slider from '$lib/components/Slider.svelte';
</script>

<div class="mx-auto max-w-md overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-md">
	<div class="relative">
		<Slider />
		<span class="absolute top-2 left-2 rounded-full bg-white px-2 py-1 text-sm text-gray-700 shadow">En vedette ✨</span>
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

		<h2 class="text-lg font-semibold text-gray-900">Banc des taulards, Créteil</h2>
		<p class="text-sm text-gray-500">132 Avenue de la Prison, 94000 Créteil, France</p>

		<div class="mt-3 flex flex-wrap gap-2">
			<span class="rounded-full bg-pink-100 px-3 py-1 text-sm text-pink-800">Date 🌸</span>
			<span class="rounded-full bg-green-100 px-3 py-1 text-sm text-green-800">Accès Gratuit</span>
			<button class="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700"
				>Voir les plages horaires</button
			>
		</div>

		<div class="mt-3 text-sm font-medium text-gray-700">★ 4,68</div>
	</div>
</div>
