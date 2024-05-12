<script lang="ts">
	import GoBackToProfile from '$lib/components/go-back-to-profile.svelte';
	import type { ActionData, PageData } from './$types';
	import ProfileLink from '$lib/components/profile-link.svelte';
	import { enhance } from '$app/forms';

	export let data: PageData;

	export let form: ActionData;
</script>

<GoBackToProfile />
<div class="w-full flex flex-col items-center px-4">
	<div class="container px-4 md:px-0">
		<form action="?/addLink" method="POST" class="w-full space-y-8" use:enhance>
			<h2 class="h2">Add Link To Your Page</h2>
			{#if form?.add?.error}
				<div class="alert variant-filled-error">
					<div class="alert-message">
						<h4 class="h4">Could not add link. Please try again.</h4>
						{#each form?.add?.messages as err}
							<p>{err}</p>
						{/each}
					</div>
				</div>
			{/if}
			{#if form?.add?.success}
				<div class="alert variant-filled-success">
					<div class="alert-message">
						<h4 class="h4">Link added successfully.</h4>
					</div>
				</div>
			{/if}
			{#if form?.delete?.success}
				<div class="alert variant-filled-success">
					<div class="alert-message">
						<h4 class="h4">Link removed successfully.</h4>
					</div>
				</div>
			{/if}

			<div class="flex gap-8 w-full">
				<label class="label w-full">
					<span>Label</span>
					<input class="input" type="text" placeholder="My Instagram Page" name="label" />
				</label>

				<label class="label w-full">
					<span>URL</span>
					<input
						class="input"
						type="url"
						placeholder={'https://www.instagram.com/your-username/'}
						name="url"
					/>
				</label>
			</div>
			<button type="submit" class="btn variant-filled-primary w-full">Add</button>
		</form>

		<div class="grid gap-4 mt-4 grid-cols-1">
			{#if data.links.length === 0}
				<h2 class="h2 text-center my-6">No links added yet.</h2>
			{/if}
			{#each data.links as link}
				{#if link.label && link.url}
					<ProfileLink {link} />
				{/if}
			{/each}
		</div>
	</div>
</div>
