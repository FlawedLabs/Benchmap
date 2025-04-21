<script lang="ts" module>
	import { authClient } from '$lib/auth-client';
	import { LogOut, Settings, User } from '@lucide/svelte';
	import ButtonDropdown from './ButtonDropdown.svelte';
	import { goto } from '$app/navigation';

	type IProps = {
		src?: string | null;
		isLink?: boolean;
	};
</script>

<script lang="ts">
	const { src, isLink = false }: IProps = $props();

	const session = authClient.useSession();
</script>

{#if src}
	{#if !isLink}
		<ButtonDropdown>
			{#snippet button()}
				<img
					{src}
					alt="Profile"
					class="relative z-0 h-8 w-8 cursor-pointer rounded-full transition-all hover:ring-4 hover:ring-gray-200 dark:hover:ring-gray-700"
				/>
			{/snippet}

			{#snippet dropdownItem()}
				<div class="pb-2">
					<div class="border-b border-gray-100 px-4 py-3">
						<p class="text-sm font-medium text-gray-900">
							{$session?.data?.user.name}
						</p>
						<p class="truncate text-xs text-gray-500">
							{$session?.data?.user.email}
						</p>
					</div>

					<div class="py-1">
						<a
							href="/profile/{$session?.data?.user.name}"
							class="flex w-full items-center gap-2 px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-50"
						>
							<User size={16} class="text-gray-400" />
							<span>Profile</span>
						</a>
						<a
							href="/settings"
							class="flex w-full items-center gap-2 px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-50"
						>
							<Settings size={16} class="text-gray-400" />
							<span>Settings</span>
						</a>
					</div>

					<div class="my-1 h-px bg-gray-100"></div>

					<button
						data-sveltekit-reload
						onclick={() =>
							authClient.signOut({
								fetchOptions: {
									onSuccess: () => goto('/', { invalidateAll: true })
								}
							})}
						class="flex w-full cursor-pointer items-center gap-2 px-4 py-2 text-sm text-red-600 transition-colors hover:bg-red-50"
					>
						<LogOut size={16} class="text-red-400" />
						<span>Sign out</span>
					</button>
				</div>
			{/snippet}
		</ButtonDropdown>
	{:else}
		<img {src} alt="Profile" class="relative z-0 h-8 w-8 cursor-pointer rounded-full" />
	{/if}
{:else}
	<div class="flex h-8 w-8 items-center justify-center rounded-full bg-amber-500">
		{$session?.data?.user.name[0].toUpperCase()}
	</div>
{/if}
