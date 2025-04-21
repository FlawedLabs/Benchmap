<script lang="ts" module>
    import {m} from '$lib/paraglide/messages';
</script>

<script lang="ts">
    import {Star, StarHalf, Star as StarOutline} from '@lucide/svelte';
    import {toast} from "svelte-sonner";

    const {userId, benchId} = $props();

    let showModal: boolean = $state(false);
    let loading: boolean = $state(false);
    let review: string = $state('');
    let rating: number = $state(1);

    const addReview = async () => {
        try {
            loading = true;
            await fetch(`/api/review`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({review, rating, userId, benchId})
            });

            showModal = false;

            toast.success(m.review_success());
        } catch (error) {
            console.error(error);
            toast.error(m.review_error());
        }
        loading = false;
        location.reload();
    };

    const setRating = (index: number, half: boolean = false) => {
        rating = half ? index + 0.5 : index + 1;
    };

    const isFullStar = (index: number) => rating >= index + 1;
    const isHalfStar = (index: number) => rating > index && rating < index + 1;
</script>

<button
        class="bg-black text-white text-sm font-medium py-1 px-3 rounded-md shadow-sm cursor-pointer"
        onclick={() => showModal = !showModal}
>
    {m.add_review()}
</button>

{#if showModal}
    <div class="fixed inset-0 z-50">
        <div class="absolute inset-0" style="background-color: rgba(0, 0, 0, 0.5);"
            role="button"
            aria-label="Fermer la modal"
            tabindex="0"
            onclick={() => showModal = false}
            onkeydown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    showModal = false;
                }
            }}
        ></div>
        <div
            class="relative flex items-center justify-center h-full"
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
            <div class="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 space-y-4">
                <h2 class="text-xl font-semibold text-gray-800">{m.add_review()}</h2>
                <div class="flex space-x-1">
                    {#each Array(5) as _, index}
                        <span
                            class="cursor-pointer text-yellow-500 text-2xl"
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
                                <Star fill="yellow" class="w-6 h-6"/>
                            {:else if isHalfStar(index)}
                                <StarHalf fill="yellow" class="w-6 h-6"/>
                            {:else}
                                <StarOutline class="w-6 h-6"/>
                            {/if}
                        </span>
                    {/each}
                </div>

                <textarea
                    bind:value={review}
                    class="w-full h-32 p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="{m.write_review()}"></textarea>

                <div class="flex justify-end space-x-3">
                    <button
                        onclick={() => showModal = !showModal}
                        class="cursor-pointer bg-gray-200 text-gray-700 px-4 py-2 rounded-xl hover:bg-gray-300 transition">
                        {m.cancel()}
                    </button>

                    <button
                        type="submit"
                        class="bg-black text-white px-4 py-2 rounded-xl transition cursor-pointer"
                        disabled={loading}
                        onclick={() => addReview()}
                    >
                        {#if loading}
                            <svg
                                class="mr-2 h-5 w-5 animate-spin text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"
                                ></circle>
                                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                                ></path>
                            </svg>
                        {/if}
                        {loading ? m.in_progress() : m.submit()}
                    </button>
                </div>
            </div>
        </div>
    </div>
{/if}
