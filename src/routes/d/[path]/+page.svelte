<script lang="ts">
	import type { PageData } from './$types';
	import { Avatar } from '@skeletonlabs/skeleton';
	import { getDefaultAvatar } from '$lib/utils/avatar';
	import getDesign from '$lib/utils/designs';
	import { onMount } from 'svelte';
	import SocialLink from '$lib/components/social-link.svelte';

	export let data: PageData;
	const title = data.user.title;
	const description = data.user.description;
	const links = data.links;

	const design = getDesign(data.user.design);

	// only get 4
	$: linksIcons = links.slice(0, 4);

	onMount(() => {
		document.body.style.backgroundColor = design.backgroundColor;
		document.body.style.backgroundImage = design.backgroundColor;
		return () => {
			document.body.style.backgroundColor = '';
			document.body.style.backgroundImage = '';
		};
	});
</script>

<div class="w-full flex justify-center" style="--text-color: {design.textColor}">
	<div
		class="flex items-center justify-center flex-col gap-2 pb-10 max-w-[500px] lg:max-w-[650px] h-links-page"
	>
		<!--{#if email === data?.session?.user?.email}-->
		<!--    <div class="flex px-6 w-full justify-center">-->
		<!--        <p class="text-sm mb-10 text-center">This is your page, you can <a href="/profile" class="underline">edit</a> it.</p>-->
		<!--    </div>-->
		<!--{/if}-->

		<div class="my-2 mt-16">
			<Avatar src={data.user.avatar ?? getDefaultAvatar(120)} width="w-[135px]">
				{data.user.title}
			</Avatar>
		</div>
		<h1 class="text-2xl text-center lg:text-4xl">{title}</h1>

		<p class="text-lg text-center lg:text-xl font-extralight">{description}</p>

		<div class="flex gap-4 icon-list">
			{#each linksIcons as link}
				{#if link.type !== 'CUSTOM'}
					<a href={link.url} target="_blank">
						<SocialLink type={link.type} />
					</a>
				{/if}
			{/each}
		</div>

		<div
			class="flex items-center flex-col pt-10 px-6 gap-5 w-[150%] h-full md:w-[200%] overflow-auto"
		>
			{#each links as link}
				<a
					href={link.url}
					class="btn variant-filled w-full gap-1"
					id="LINK"
					style="background: {design.buttonColor}; color: {design.buttonTextColor}"
					target="_blank"
				>
					{link.label}
				</a>
			{/each}
		</div>
	</div>
</div>

<div class="absolute bottom-10 right-0 -translate-x-[10%] md:-translate-x-1/2">
	<a
		class="btn variant-filled-primary rounded-xl"
		href="/profile"
		style="background: {design.buttonColor}; color: {design.buttonTextColor}"
		id="add-linker-button"
	>
		Create your Linker
	</a>
</div>

<style lang="postcss">
	#add-linker-button {
		animation: pulse 2s infinite cubic-bezier(0.4, 0, 0.6, 1);
	}

	@keyframes pulse {
		0%,
		100% {
			transform: scale(1);
		}
		50% {
			transform: scale(1.05);
		}
	}

	p,
	h1 {
		color: var(--text-color);
	}
</style>
