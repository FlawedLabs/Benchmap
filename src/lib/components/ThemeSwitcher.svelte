<script lang="ts" module>
	import { Check, ChevronDown, Moon, Sun } from '@lucide/svelte';
	import ButtonDropdown from './ButtonDropdown.svelte';
	import { setTheme } from '$lib/utils/Theme';
</script>

<script lang="ts">
	let isOpen = $state(false);

	let theme: 'light' | 'dark' | 'system' = $state('system');

	function toggleTheme() {
		theme = theme === 'light' ? 'dark' : 'light';
	}
</script>

<ButtonDropdown>
	{#snippet button()}
		<button
			class="relative z-10 flex cursor-pointer items-center gap-2 rounded-md p-2 text-gray-700 hover:bg-gray-100 focus:ring-2 dark:text-gray-300 dark:hover:bg-gray-800"
			onclick={() => (isOpen = !isOpen)}
		>
			{#if theme === 'light'}
				<Sun size={18} />
			{:else}
				<Moon size={18} />
			{/if}
			<span class={`transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
				<ChevronDown size={14} />
			</span>
		</button>
	{/snippet}

	<!-- Huge todo but I need to sleep 🛌 -->
	{#snippet dropdownItem()}
		<ul class="py-1">
			<li>
				<button
					onclick={() => setTheme('light')}
					class="flex w-full cursor-pointer justify-between px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
				>
					Light Mode
					{#if theme === 'light'}
						<span class="ml-2 flex items-center text-gray-700 dark:text-gray-300">
							<Check size={14} />
						</span>
					{/if}
				</button>
			</li>
			<li>
				<button
					onclick={() => setTheme('dark')}
					class="flex w-full cursor-pointer justify-between px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
				>
					{theme === 'light' ? 'Light Mode' : 'Dark Mode'}
					{#if theme === 'dark'}
						<span class="ml-2 flex items-center text-gray-700 dark:text-gray-300">
							<Check size={14} />
						</span>
					{/if}
				</button>
			</li>
			<li>
				<button
					onclick={() => (theme = 'system')}
					class="flex w-full cursor-pointer justify-between px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
				>
					System Default
					{#if theme === 'system'}
						<span class="ml-2 flex items-center text-gray-700 dark:text-gray-300">
							<Check size={14} />
						</span>
					{/if}
				</button>
			</li>
		</ul>
	{/snippet}
</ButtonDropdown>
