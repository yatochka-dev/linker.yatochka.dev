<script lang="ts">
	import { onMount } from 'svelte';

	let dots = 2;
	// eslint-disable-next-line no-undef
	let interval: NodeJS.Timeout | null = null;

	function startLoading() {
		interval = setInterval(() => {
			dots = (dots + 1) % 4;
		}, 500);
	}

	function stopLoading() {
		if (interval) clearInterval(interval);
		dots = 0;
	}

	onMount(() => {
		startLoading();

		return stopLoading;
	});
</script>

Loading{#each Array.from({ length: dots }, (_, i) => i) as i}
	. <div class="hidden">{i}</div>
{/each}
