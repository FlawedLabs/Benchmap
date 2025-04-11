<script lang="ts">
	let currentIndex = 0;
	let startX = 0;
	let isDragging = false;
	let wasDragged = false;

	const DRAGGED_THRESHOLD = 10;
	let buttons: HTMLButtonElement[] = [];

	const images = [
		'https://images.unsplash.com/photo-1445937888010-cc262f556033?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
		'https://plus.unsplash.com/premium_photo-1676528716101-9fac11eb5548?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
		'https://images.unsplash.com/photo-1499399631978-a966e7b231fa?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGJhbmN8ZW58MHx8MHx8fDA%3D'
	];

	const handleMouseDown = (event: MouseEvent) => {
		event.stopPropagation();
		event.preventDefault();

		startX = event.clientX;
		isDragging = true;
		wasDragged = false;
	};

	const handleMouseMove = (event: MouseEvent) => {
		if (!isDragging) return;

		event.stopPropagation();
		event.preventDefault();

		const deltaX = event.clientX - startX;

		// Check if the user has dragged the slider
		if (Math.abs(deltaX) > DRAGGED_THRESHOLD) {
			wasDragged = true;
		}

		if (deltaX > 50) {
			currentIndex = (currentIndex - 1 + images.length) % images.length;
			isDragging = false;
		} else if (deltaX < -50) {
			currentIndex = (currentIndex + 1) % images.length;
			isDragging = false;
		}
	};

	const handleMouseUp = (event: MouseEvent) => {
		event.stopPropagation();
		event.preventDefault();
		isDragging = false;
	};

	const handleClick = (event: MouseEvent | KeyboardEvent) => {
		if (wasDragged) {
			event.preventDefault(); // cancel anchor navigation
		}
	};

	// Used for accessibility
	const focusButton = (index: number) => {
		if (buttons[index]) {
			buttons[index].focus();
		}
	};
</script>

<div
	class="relative mx-auto w-full max-w-2xl overflow-hidden rounded-lg select-none"
	onmousedown={handleMouseDown}
	onmousemove={handleMouseMove}
	onmouseup={handleMouseUp}
	onclick={handleClick}
	role="slider"
	tabindex="0"
	aria-valuenow={currentIndex}
	aria-valuemin="0"
	aria-valuemax={images.length - 1}
	aria-label="Image slider"
	aria-describedby="slider-description"
	onkeypress={handleClick}
>
	<div
		class="flex transition-transform duration-500"
		style="transform: translateX(-{currentIndex * 100}%)"
	>
		{#each images as image}
			<img src={image} alt="Slider" class="w-full flex-shrink-0" draggable="false" />
		{/each}
	</div>

	<div class="absolute bottom-4 left-1/2 flex -translate-x-1/2 space-x-2">
		{#each images as _, i}
			<button
				bind:this={buttons[i]}
				class="h-2 w-2 cursor-pointer rounded-full"
				class:bg-gray-200={i === currentIndex}
				class:bg-gray-400={i !== currentIndex}
				onclick={(event) => {
					event.stopPropagation();
					event.preventDefault();
					currentIndex = i;
				}}
				onkeydown={(event) => {
					// Accessibility here you go 💪
					if (event.key === 'ArrowRight' || event.key === ' ') {
						event.stopPropagation();
						event.preventDefault();

						const nextIndex = (i + 1) % images.length;
						currentIndex = nextIndex;
						focusButton(nextIndex);
					} else if (event.key === 'ArrowLeft') {
						event.stopPropagation();
						event.preventDefault();

						const prevIndex = (i - 1 + images.length) % images.length;
						currentIndex = prevIndex;
						focusButton(prevIndex);
					}
				}}
				aria-label="Select image {i + 1}"
			></button>
		{/each}
	</div>
</div>
