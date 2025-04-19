<script lang="ts" module>
	import { clickOutside } from '$lib/utils/dom.svelte';
	import type { Snippet } from 'svelte';
	import { fade } from 'svelte/transition';

	type IProps = {
		button: Snippet;
		dropdownItem: Snippet;
		width?: string;
	};
</script>

<script lang="ts">
	let { button, dropdownItem, width = '48' }: IProps = $props();

	let isOpen = $state(false);
</script>

<div
	class="relative isolate rounded-md"
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
			class="absolute top-full right-0 w-{width} rounded-lg border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-900 dark:shadow-gray-800"
		>
			{@render dropdownItem()}
		</div>
	{/if}
</div>
