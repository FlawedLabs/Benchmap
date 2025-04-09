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
	{:else}
		<div class="flex h-8 w-8 items-center justify-center rounded-full bg-amber-500">
			{$session?.data?.user.name[0].toUpperCase()}
		</div>
	{/if}
</div>
