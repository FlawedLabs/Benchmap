<script lang="ts" module>
</script>

<script lang="ts">
	import { Check, ChevronDown } from '@lucide/svelte';
	import { setLocale, locales, getLocale } from '$lib/paraglide/runtime';
	import type { Action } from 'svelte/action';
	import { fade } from 'svelte/transition';
	import { m } from '$lib/paraglide/messages';

	// Update whenever new languages are added
	const langEnum = {
		en: 'English',
		fr: 'Français'
	};

	let isOpen = $state(false);

	// We could probably put that in a utils file but I'm too lazy 🏃
	export const clickOutside: Action<HTMLElement, () => void> = (node, callback) => {
		$effect(() => {
			const handleClick = (event: MouseEvent) => {
				if (node && !node.contains(event.target as Node) && !event.defaultPrevented) {
					callback();
				}
			};

			document.addEventListener('click', handleClick, true);

			return () => {
				document.removeEventListener('click', handleClick, true);
			};
		});
	};
</script>

<div class="relative" use:clickOutside={() => (isOpen = false)}>
	<button
		class="flex cursor-pointer items-center gap-2 rounded-md p-2 text-gray-700 hover:bg-gray-100"
		onclick={() => (isOpen = !isOpen)}
	>
		{m.languages()}
		<span class={`transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
			<ChevronDown size={14} />
		</span>
	</button>
	{#if isOpen}
		<div
			transition:fade={{ duration: 150 }}
			class="absolute top-8 right-0 z-10 mt-2 w-48 rounded-md bg-white shadow-lg"
		>
			<ul class="py-1">
				{#each locales as lang}
					<li>
						<button
							onclick={() => setLocale(lang)}
							class="flex w-full cursor-pointer justify-between px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
						>
							{langEnum[lang]}
							{#if lang === getLocale()}
								<span class="ml-2 flex items-center text-gray-700">
									<Check size={14} />
								</span>
							{/if}
						</button>
					</li>
				{/each}
			</ul>
		</div>
	{/if}
</div>
