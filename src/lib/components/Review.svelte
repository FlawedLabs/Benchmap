<script lang="ts" module>
	import type { Tag } from '@prisma/client';

	type IProps = {
		profileSrc: string | null;
		reviewerName: string;
		comment: string;
		createdAt: Date;
		tags: Tag[];
	};
</script>

<script lang="ts">
	import ProfilePicture from './ProfilePicture.svelte';

	const { profileSrc, reviewerName, comment, tags, createdAt = new Date() }: IProps = $props();
</script>

<div class="rounded-xl p-4 text-sm text-gray-800 shadow-sm transition-shadow hover:shadow-md">
	<div class="mb-1 flex items-center gap-2">
		<ProfilePicture src={profileSrc} />
		<span class="font-medium">{reviewerName}</span>
	</div>
	<p class="text-gray-700">
		"{comment}"
	</p>
	<p class="mt-2 text-xs text-gray-400">{createdAt.toLocaleDateString()}</p>
	<div class="mt-2 flex flex-wrap gap-2 text-xs text-blue-600">
		{#each tags as tag}
			<a href="/bench/${tag.name}">
				<span>{tag.name}</span>
			</a>
		{/each}
	</div>
</div>
