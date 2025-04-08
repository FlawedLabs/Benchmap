<script lang="ts" module>
	import { setLocale } from '$lib/paraglide/runtime';
	import type { Locale } from '$lib/paraglide/runtime';

	type IProps = {
		lang: Locale;
	};
</script>

<script lang="ts">
	const { lang = 'fr' }: IProps = $props();
</script>

<button onclick={() => setLocale(lang)}>
	<img class="h-6 w-10" src={`/flags/${lang}.png`} alt={`${lang} Flag`} />
</button>
