<script lang="ts" module>
	import { Check, ChevronDown, Languages } from '@lucide/svelte';
	import { setLocale, locales, getLocale } from '$lib/paraglide/runtime';
	import { animate } from 'animejs';
	import ButtonDropdown from './ButtonDropdown.svelte';
</script>

<script lang="ts">
	// Update whenever new languages are added
	const langEnum = {
		en: 'English',
		fr: 'Français'
	};

	let isOpen = $state(false);

	const playAnimation = () => {
		const langIcon = document.querySelector('.lucide-languages');

		if (langIcon) {
			animate(langIcon, {
				keyframes: [{ rotate: 0 }, { rotate: -10 }, { rotate: 10 }, { rotate: 0 }],
				duration: 1000,
				easing: 'easeInOutSine'
			});
		}
	};
</script>

<ButtonDropdown bind:isOpen>
	{#snippet button()}
		<span
			class="relative z-10 flex cursor-pointer items-center gap-2 rounded-md p-2 text-gray-700 hover:bg-gray-100 focus:ring-2 dark:text-gray-300 dark:hover:bg-gray-800"
			onmouseenter={() => playAnimation()}
			role="img"
		>
			<Languages size={18} />
			<span class={`transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
				<ChevronDown size={14} />
			</span>
		</span>
	{/snippet}

	{#snippet dropdownItem()}
		<ul class="py-1">
			{#each locales as lang}
				<li>
					<button
						onclick={() => setLocale(lang)}
						class="flex w-full cursor-pointer justify-between px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
					>
						{langEnum[lang]}
						{#if lang === getLocale()}
							<span class="ml-2 flex items-center text-gray-700 dark:text-gray-300">
								<Check size={14} />
							</span>
						{/if}
					</button>
				</li>
			{/each}
		</ul>
	{/snippet}
</ButtonDropdown>
