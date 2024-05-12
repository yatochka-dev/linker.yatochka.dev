<script lang="ts">
	import { enhance } from '$app/forms';
	import { type Link } from '@prisma/client';

	export let link: Link;
	let files: FileList;

	function c(fil: FileList) {
		console.log('heelo', fil);
	}

	$: c(files);
</script>

<form class="p-4 w-full rounded-sm flex" method="POST" use:enhance>
	<div class="w-[75%] flex items-center gap-2">
		<input class="input" type="text" bind:value={link.label} name="label" />
		- <input class="input" type="url" bind:value={link.url} name="url" />
	</div>
	<div class="flex-grow"></div>
	<input type="hidden" bind:value={link.id} name="id" />
	<div class="flex gap-2">
		<button class="btn variant-filled-secondary" type="submit" formaction="?/updateLink"
			>Update</button
		>
		<button class="btn variant-filled-error" type="submit" formaction="?/deleteLink">Remove</button>
	</div>
</form>
