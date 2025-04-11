<script lang="ts" module>
	import { page } from '$app/state';
	import { sleep } from '$lib/utils/Utils';

	type IProps = {
		isLiked?: boolean;
	};
</script>

<script lang="ts">
	import { Heart } from '@lucide/svelte';
	import { animate } from 'animejs';

	let { isLiked }: IProps = $props();

	let container: HTMLElement;

	const LIKE_AMOUNT = 5;

	const triggerLikeAnimation = async () => {
		if (!container) return;

		let index = 0;
		while (index < LIKE_AMOUNT) {
			const heart = document.createElement('div');
			heart.className = 'heart-emoji absolute left-2 top-2 pointer-events-none';
			heart.textContent = '❤️';

			container.appendChild(heart);

			animate(heart, {
				keyframes: {
					'0%': { y: 0 },
					'75%': { x: Math.random() * 100 - 50 },
					'100%': { y: -100 }
				},
				easing: 'inOut',
				opacity: [1, 0],
				duration: 1500,
				onComplete: () => heart.remove()
			});

			// Maybe we could use stagger but I'm too dumb to understand how it works
			await sleep(50);
			index++;
		}
	};

	const addLike = async (slug: string) => {
		await fetch(`/api/bench/like/${slug}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			}
		});
	};

	const removeLike = async (slug: string) => {
		await fetch(`/api/bench/like/${slug}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			}
		});
	};

	const triggerLike = async () => {
		if (!isLiked) {
			triggerLikeAnimation();
		}

		isLiked = !isLiked;

		const slug = page.params.slug;

		if (isLiked) {
			await addLike(slug);
		} else {
			await removeLike(slug);
		}
	};
</script>

<div bind:this={container} class="relative">
	<button
		onclick={triggerLike}
		class="cursor-pointer rounded-full bg-white p-2 shadow transition-all hover:bg-gray-50 active:scale-95"
	>
		<Heart size={16} fill={isLiked ? 'red' : 'white'} color={isLiked ? 'red' : 'black'} />
	</button>
</div>

<style>
</style>
