<script lang="ts">
	import GoBackToProfile from '$lib/components/go-back-to-profile.svelte';
	import type { ActionData, PageData } from './$types';
	import { onMount } from 'svelte';
	import { debounce } from '$lib/utils/debounce';
	import { fade } from 'svelte/transition';
	import { PageDesign } from '@prisma/client';
	import { type AutocompleteOption } from '@skeletonlabs/skeleton';

	export let data: PageData;
	let mounted = false;
	let validating = false;
	let isValid = false;
	let path = data.user.pagePath;

	let selectedDesign: PageDesign = data.user.linkPageDesign;

	console.log(data.user.linkPageDesign);

	onMount(() => {
		mounted = true;
	});

	const validatePath = debounce(async (p: string) => {
		if (!mounted) return;
		if (validating) return;
		validating = true;
		const resp = await fetch('/api/validate-path', {
			body: JSON.stringify({
				id: data.user.id,
				path: p
			}),
			method: 'POST'
		});
		validating = false;
		isValid = resp.ok;
	}, 300);

	$: validatePath(path);

	export let form: ActionData;


	const designAutocompleteOptions: AutocompleteOption<PageDesign>[] = [
		{
			label: 'Black White',
			value: 'BLACKWHITE'
		},
		{
			label: 'White Black',
			value: 'WHITEBLACK'
		},
		{
			label: 'Colorful',
			value: 'COLORFUL'
		}
	];

</script>

<GoBackToProfile />

<form method="POST" class="w-full flex flex-col items-center px-4">
	<div class="container space-y-2">
		<!--{#if form?.success}-->
		<!--    <div class="alert variant-filled-success my-10" transition:fade>-->
		<!--        <div class="alert-message">-->
		<!--            <h3 class="h3">Success</h3>-->
		<!--            <p>Your page has been updated</p>-->
		<!--        </div>-->

		<!--    </div>-->
		<!--{/if}-->
		{#if form?.error}
			<div class="alert variant-filled-error my-10 rounded-xl" transition:fade>
				<div class="alert-message">
					<h3 class="h3">Could not update</h3>
					{#each form?.messages as msg}
						<p>{msg}</p>
					{/each}
				</div>
			</div>
		{/if}
		<label class="label">
			<span>Links Page Title</span>
			<input
				class="input"
				type="text"
				placeholder="COOL PAGE"
				name="title"
				bind:value={data.user.linkPageTitle}
			/>
		</label>

		<label class="label">
			<span>Links Page Subtitle</span>
			<input
				class="input"
				type="text"
				placeholder="WELCOME TO MY COOL PAGE!!!"
				name="description"
				bind:value={data.user.linkPageDescription}
			/>
		</label>

		<label class="label">
			<span>Page Design</span>
			<select class="select cursor-pointer" name="design" bind:value={selectedDesign}>
				{#each designAutocompleteOptions as option}
					<option value={option.value}>{option.label}</option>
				{/each}
			</select>
		</label>

		<label class="label">
			<span>Links Page path</span>
			<input class="input" type="text" placeholder="my-cool-page" name="path" bind:value={path} />
		</label>
		<div class="flex flex-col md:flex-row opacity-50 justify-between px-1 py-1">
			<p class="text-primary opacity-50">
				URL: {data.url}/d/{path}
			</p>

			{#if validating}
				<p class="text-primary opacity-50">Checking...</p>
			{:else if isValid}
				<p class="text-green-500">You can use this path</p>
			{:else}
				<p class="text-red-500">You can't use this path</p>
			{/if}
		</div>

		<input type="hidden" value={data.user.id} name="id" />
		<div class="py-5">
			<button
				class="btn variant-filled-primary w-full"
				type="submit"
				disabled={!isValid || validating}
				>Submit
			</button>
		</div>
	</div>
</form>
