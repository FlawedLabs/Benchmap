<script lang="ts" module>
	import { m } from '$lib/paraglide/messages';
	import type { User } from 'better-auth';
	import LangPicker from './LangPicker.svelte';
	import ProfilePicture from './ProfilePicture.svelte';
	import MobileMenu from './MobileMenu.svelte';
	import ThemeSwitcher from './ThemeSwitcher.svelte';

	type IProps = {
		user: User | undefined;
		isFull?: boolean;
	};
</script>

<script lang="ts">
	let { user, isFull = true }: IProps = $props();
	let isMenuOpen = $state(false);
</script>

<nav
	class="fixed top-0 z-50 flex max-h-16 w-screen items-center justify-between bg-white/80 p-4 backdrop-blur-sm dark:bg-gray-900/80"
>
	<h1 class="text-2xl font-bold text-gray-900 dark:text-white">
		<a href="/">Benchmap</a>
	</h1>

	{#if isFull}
		<!-- Desktop Menu -->
		<div class="hidden items-center gap-2 md:flex">
			<ThemeSwitcher />
			<LangPicker />
			{#if user}
				<ProfilePicture src={user.image} />
			{:else}
				<a
					href="/register"
					class="rounded-md p-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 focus:ring-2 dark:text-gray-300 dark:hover:bg-gray-800"
				>
					{m.sign_up()}
				</a>
				<a
					href="/login"
					class="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-gray-800 hover:shadow-md active:scale-95 active:transform dark:bg-gray-700 dark:hover:bg-gray-600"
				>
					{m.sign_in()}
				</a>
			{/if}
		</div>

		<!-- Mobile Menu Button -->
		<MobileMenu {isMenuOpen} {user} />
	{/if}
</nav>
