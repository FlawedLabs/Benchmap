<script lang="ts" module>
	type IProps = {
		ratings: number[];
	};
</script>

<script lang="ts">
	import { calculateAverage } from '$lib/utils/Utils';

	let { ratings }: IProps = $props();
</script>

<span class="font-medium">★ {calculateAverage(ratings)}</span>
