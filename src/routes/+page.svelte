<script lang="ts">
	import { authClient } from '$lib/auth-client';
	import BenchCard from '$lib/components/BenchCard.svelte';
	import { m } from '$lib/paraglide/messages.js';

	const session = authClient.useSession();
</script>

<div>
	{#if $session.data}
		<div>
			<button
				on:click={async () => {
					await authClient.signOut();
				}}
			>
				{m.sign_out()}
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
			{m.continue_github()}
		</button>
	{/if}
</div>

<BenchCard />
