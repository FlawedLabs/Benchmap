<script lang="ts" module>
	import { clickOutside } from '$lib/utils/dom.svelte';
	import type { Snippet } from 'svelte';
	import { fade } from 'svelte/transition';

	type IProps = {
		button: Snippet;
		dropdownItem: Snippet;
	};
</script>

<script lang="ts">
	let { button, dropdownItem }: IProps = $props();

	let isOpen = $state(false);
</script>

<div
	class="relative isolate rounded-md hover:cursor-pointer hover:bg-gray-100 focus:ring-2"
	use:clickOutside={() => (isOpen = false)}
	onclick={() => (isOpen = !isOpen)}
	role="button"
	tabindex="0"
	onkeydown={(e) => {
		if (e.key === 'Enter' || e.key === ' ') {
			isOpen = !isOpen;
		}
	}}
>
	{@render button()}
	{#if isOpen}
		<div
			transition:fade={{ duration: 150 }}
			class="absolute top-8 right-0 z-[100] mt-2 w-48 rounded-md bg-white shadow-lg"
		>
			{@render dropdownItem()}
		</div>
	{/if}
</div>
