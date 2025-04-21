import type { Action } from 'svelte/action';

export const clickOutside: Action<HTMLElement, () => void> = (node, callback) => {
	$effect(() => {
		const handleClick = (event: MouseEvent) => {
			if (node.contains(event.target as Node)) {
				return;
			}

			if (event.defaultPrevented) {
				return;
			}

			callback();
		};

		document.addEventListener('mousedown', handleClick, true);

		return () => {
			document.removeEventListener('mousedown', handleClick, true);
		};
	});
};
