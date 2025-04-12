<script lang="ts" module>
	import { authClient } from '$lib/auth-client';
	import { LogOut, UserCog } from '@lucide/svelte';
	import ButtonDropdown from './ButtonDropdown.svelte';
	import { goto } from '$app/navigation';

	type IProps = {
		src?: string | null;
	};
</script>

<script lang="ts">
	const { src }: IProps = $props();

	const session = authClient.useSession();
</script>

<div>
	{#if src}
		<ButtonDropdown>
			{#snippet button()}
				<img {src} alt="Profile" class="h-8 w-8 rounded-full" />
			{/snippet}

			{#snippet dropdownItem()}
				<ul>
					<li>
						<a
							href="/settings"
							class="flex w-full cursor-pointer items-center gap-2 px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
						>
							<UserCog size={16} />

							Profile Settings
						</a>

						<button
							onclick={() =>
								authClient.signOut({
									fetchOptions: {
										onSuccess: () => {
											goto('/', { invalidateAll: true });
										}
									}
								})}
							class="flex w-full cursor-pointer items-center gap-2 px-4 py-2 text-left text-sm text-red-500 hover:bg-gray-100"
						>
							<LogOut color="red" size={16} />

							Logout
						</button>
					</li>
				</ul>
			{/snippet}
		</ButtonDropdown>
	{:else}
		<div class="flex h-8 w-8 items-center justify-center rounded-full bg-amber-500">
			{$session?.data?.user.name[0].toUpperCase()}
		</div>
	{/if}
</div>
