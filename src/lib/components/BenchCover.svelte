<script lang="ts" module>
	type IProps = {
		src: string;
		alt: string;
	};
</script>

<script lang="ts">
	let { src, alt }: IProps = $props();
</script>

<img {src} {alt} class="h-48 w-full object-cover" />
