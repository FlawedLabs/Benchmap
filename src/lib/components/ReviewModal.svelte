<script lang="ts" module>
	import { m } from '$lib/paraglide/messages';
	import { LoaderCircle, Star, StarHalf } from '@lucide/svelte';
	import { toast } from 'svelte-sonner';
	import { fade } from 'svelte/transition';
</script>

<script lang="ts">
	const { userId, benchId } = $props();

	let showModal: boolean = $state(false);
	let loading: boolean = $state(false);
	let review: string = $state('');
	let rating: number = $state(3);

	const addReview = async () => {
		try {
			loading = true;
			await fetch(`/api/review`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ review, rating, userId, benchId })
			});

			toast.success(m.review_success());

			showModal = false;
		} catch (error) {
			toast.error(m.review_error());
		} finally {
			loading = false;
		}
	};

	const setRating = (index: number, half: boolean = false) => {
		rating = half ? index + 0.5 : index + 1;
	};

	const isFullStar = (index: number) => rating >= index + 1;
	const isHalfStar = (index: number) => rating > index && rating < index + 1;
</script>

<button
	class="cursor-pointer rounded-md bg-black px-3 py-1 text-sm font-medium text-white shadow-sm"
	onclick={() => (showModal = !showModal)}
>
	{m.add_review()}
</button>

{#if showModal}
	<div transition:fade={{ duration: 150 }} class="fixed inset-0 z-50">
		<div
			class="absolute inset-0"
			style="background-color: rgba(0, 0, 0, 0.5);"
			role="button"
			aria-label="Fermer la modal"
			tabindex="0"
			onclick={() => (showModal = false)}
			onkeydown={(e) => {
				if (e.key === 'Enter' || e.key === ' ') {
					showModal = false;
				}
			}}
		></div>
		<div
			class="relative flex h-full items-center justify-center"
			role="dialog"
			aria-modal="true"
			tabindex="0"
			onclick={(e) => e.stopPropagation()}
			onkeydown={(e) => {
				if (e.key === 'Enter' || e.key === ' ') {
					e.stopPropagation();
				}
			}}
		>
			<div class="w-full max-w-md space-y-4 rounded-xl bg-white p-6 shadow-xl">
				<h2 class="text-xl font-semibold text-gray-800">{m.add_review()}</h2>
				<div class="flex space-x-1">
					{#each Array(5) as _, index}
						<span
							class="cursor-pointer text-2xl"
							role="button"
							tabindex="0"
							aria-label={`Étoile ${index + 1}`}
							onclick={() => setRating(index)}
							ondblclick={() => setRating(index, true)}
							onkeydown={(e) => {
								if (e.key === 'Enter' || e.key === ' ') {
									setRating(index);
								}
							}}
						>
							{#if isFullStar(index)}
								<Star color="#ffdf20" fill="#ffdf20" class="h-6 w-6" />
							{:else if isHalfStar(index)}
								<div class="relative">
									<StarHalf fill="#ffdf20" color="#ffdf20" class="h-6 w-6" />
									<div class="absolute inset-0">
										<StarHalf fill="gray" color="gray" class="h-6 w-6 scale-x-[-1] transform" />
									</div>
								</div>
							{:else}
								<Star fill="gray" color="gray" class="h-6 w-6" />
							{/if}
						</span>
					{/each}
				</div>

				<textarea
					bind:value={review}
					class="h-32 w-full rounded-md border border-gray-300 p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
					placeholder={m.write_review()}
				></textarea>

				<div class="flex justify-end space-x-3">
					<button
						onclick={() => (showModal = !showModal)}
						class="cursor-pointer rounded-md bg-gray-200 px-4 py-2 text-sm text-gray-700 ring-blue-500 transition hover:bg-gray-300 focus:ring-2"
					>
						{m.cancel()}
					</button>

					<button
						type="submit"
						class="flex cursor-pointer items-center justify-center gap-2 rounded-md bg-black px-4 py-2 text-sm text-white ring-blue-500 transition focus:ring-2"
						disabled={loading}
						onclick={() => addReview()}
					>
						{#if loading}
							<span
								transition:fade={{ duration: 150 }}
								class="flex h-5 w-5 animate-spin items-center text-white"
							>
								<LoaderCircle />
							</span>
						{/if}
						{loading ? m.in_progress() : m.submit()}
					</button>
				</div>
			</div>
		</div>
	</div>
{/if}
