<script lang="ts" module>
	import type { Prisma, Tag } from '@prisma/client';

	type IProps = {
		tags: Prisma.TagGetPayload<{
			include: { _count: { select: { benches: true } } };
		}>[];
	};
</script>

<script lang="ts">
	const { tags }: IProps = $props();
</script>

<!-- Adapt for mobile later, I need to sleep :) -->
<aside class="fixed top-0 left-0 h-full w-64 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
	<h2 class="mb-4 text-lg font-semibold text-gray-800 dark:text-white">Popular Tags</h2>
	<ul class="space-y-2">
		{#each tags as tag}
			<li>
				<a
					href={`/tag/${tag.slug}`}
					class="flex items-center justify-between rounded-md p-2 transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-700"
				>
					<span class="text-gray-700 dark:text-white">{tag.name}</span>
					<span
						class="rounded-full bg-gray-200 px-3 py-1 text-sm text-gray-600 dark:bg-gray-800 dark:text-gray-300"
					>
						{tag._count.benches}
					</span>
				</a>
			</li>
		{/each}
	</ul>
</aside>
