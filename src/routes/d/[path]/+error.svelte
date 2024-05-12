<script lang="ts">
	import { page } from '$app/stores';
</script>

<div class="flex h-full justify-center items-center">
	<h1 class="text-2xl text-center mb-10">{$page.error.message}</h1>
</div>
