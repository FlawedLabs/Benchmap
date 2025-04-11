<script lang="ts" module>
	import { m } from '$lib/paraglide/messages';
	import type { Bench } from '@prisma/client';

	type IProps = {
		currentHours: string;
		bench: Bench;
	};
</script>

<script lang="ts">
	let { currentHours, bench }: IProps = $props();

	const isOpen = () => {
		if (!bench.openFrom || !bench.openUntil) return true;

		const current = parseInt(currentHours.replace(':', ''));
		const opening = parseInt(bench.openFrom.replace(':', ''));
		const closing = parseInt(bench.openUntil.replace(':', ''));

		return current >= opening && current <= closing;
	};
</script>

<span class={`font-semibold ${isOpen() ? 'text-green-500' : 'text-red-500'}`}>
	● {isOpen() ? m.bench_state_open() : m.bench_state_closed()}</span
>
