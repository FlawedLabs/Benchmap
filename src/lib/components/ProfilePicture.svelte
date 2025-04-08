<script lang="ts" module>
	import { authClient } from '$lib/auth-client';

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
		<img {src} alt="Profile" class="h-8 w-8 rounded-full" />
	{:else if !$session?.data?.user.image}
		<span class="h-8 w-8 rounded-full">
			{$session?.data?.user.name[0].toUpperCase()}
		</span>
	{:else}
		<img src={$session?.data?.user.image} alt="Profile" class="h-8 w-8 rounded-full" />
	{/if}
</div>
