<script lang="ts" module>
	import { CircleUserRound, Heart, Plus, Search, Sparkles } from '@lucide/svelte';
	import ProfilePicture from './ProfilePicture.svelte';
	import type { User } from 'better-auth';

	type IProps = {
		user: User | undefined;
	};
</script>

<script lang="ts">
	const { user }: IProps = $props();
</script>

<div
	class="fixed right-0 bottom-0 left-0 z-50 flex h-[72px] items-center justify-around bg-white py-3 shadow-md dark:bg-gray-900 dark:shadow-gray-800"
>
	<button
		class="cursor-pointer text-2xl text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
	>
		<Search />
	</button>

	<a
		href="/bench/likes"
		class="cursor-pointer text-2xl text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
	>
		<Heart />
	</a>

	<a
		href="/bench/add"
		class="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-gray-900 text-3xl text-white shadow-md hover:bg-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600"
	>
		<Plus />
	</a>

	<a
		href="/bench/discover"
		class="cursor-pointer text-2xl text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
	>
		<Sparkles />
	</a>

	{#if user}
		<a href="/profile/{user?.name}" class="cursor-pointer">
			<ProfilePicture isLink src={user?.image} />
		</a>
	{:else}
		<a
			href="/signin"
			class="text-2xl text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
		>
			<CircleUserRound />
		</a>
	{/if}
</div>
