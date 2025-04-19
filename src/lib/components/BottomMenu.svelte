<script lang="ts" module>
	import { Heart, Plus, Search, Sparkles } from '@lucide/svelte';
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
	class="fixed right-0 bottom-0 left-0 z-50 flex h-[72px] items-center justify-around bg-white py-3 shadow-md"
>
	<button class="cursor-pointer text-2xl">
		<Search />
	</button>

	<button class="cursor-pointer text-2xl">
		<Heart />
	</button>

	<a
		href="/bench/add"
		class="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-black text-3xl text-white shadow-md"
	>
		<Plus />
	</a>

	<button class="cursor-pointer text-2xl">
		<Sparkles />
	</button>

	<button class="cursor-pointer">
		<ProfilePicture src={user?.image} />
	</button>
</div>
