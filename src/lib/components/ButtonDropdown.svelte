<script lang="ts" module>
	import { clickOutside } from '$lib/utils/dom.svelte';
	import type { Snippet } from 'svelte';
	import { fade } from 'svelte/transition';

	type IProps = {
		button: Snippet;
		dropdownItem: Snippet;
		width?: string;
		isOpen?: boolean;
	};
</script>

<script lang="ts">
	let { button, dropdownItem, width = '48', isOpen = $bindable(false) }: IProps = $props();
</script>

<div
	class="relative isolate flex items-center rounded-md"
	use:clickOutside={() => (isOpen = false)}
	role="button"
	tabindex="0"
	onkeydown={(e) => {
		if (e.key === 'Enter' || e.key === ' ') {
			isOpen = !isOpen;
		}
	}}
>
	<button class="block w-full" type="button" onclick={() => (isOpen = !isOpen)}>
		{@render button()}
	</button>

	{#if isOpen}
		<div
			transition:fade={{ duration: 150 }}
			class="absolute top-full right-0 w-{width} rounded-lg border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-900 dark:shadow-gray-800"
		>
			{@render dropdownItem()}
		</div>
	{/if}
</div>
