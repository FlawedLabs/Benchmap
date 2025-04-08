<script lang="ts">
	import { authClient } from '$lib/auth-client';
	const session = authClient.useSession();
</script>

<div>
	{#if $session.data}
		<div>
			<p>
				{$session?.data?.user.name}
			</p>

			<img src={$session?.data?.user.image} alt="Profile" />

			<button
				on:click={async () => {
					await authClient.signOut();
				}}
			>
				Sign Out
			</button>
		</div>
	{:else}
		<button
			on:click={async () => {
				await authClient.signIn.social({
					provider: 'github'
				});
			}}
		>
			Continue with github
		</button>
	{/if}
</div>
