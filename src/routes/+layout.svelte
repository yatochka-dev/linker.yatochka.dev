<script lang="ts">
	import '../app.postcss';
	import { AppShell, AppBar } from '@skeletonlabs/skeleton';

	// Highlight JS
	import hljs from 'highlight.js/lib/core';
	import 'highlight.js/styles/github-dark.css';
	import { storeHighlightJs } from '@skeletonlabs/skeleton';
	import xml from 'highlight.js/lib/languages/xml'; // for HTML
	import css from 'highlight.js/lib/languages/css';
	import javascript from 'highlight.js/lib/languages/javascript';
	import typescript from 'highlight.js/lib/languages/typescript';
	import LoadingText from '$lib/components/loading-text.svelte';

	hljs.registerLanguage('xml', xml); // for HTML
	hljs.registerLanguage('css', css);
	hljs.registerLanguage('javascript', javascript);
	hljs.registerLanguage('typescript', typescript);
	storeHighlightJs.set(hljs);

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	import { navigating, page } from '$app/stores';
	import { SignIn } from '@auth/sveltekit/components';
	import { getDefaultAvatar } from '$lib/utils/avatar';

	import { initializeStores, Modal } from '@skeletonlabs/skeleton';

	initializeStores();
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

	$: session = $page.data.session;

	$: appbar = $page.route.id !== '/d/[path]';
</script>

<!-- App Shell -->
<Modal />
<AppShell>
	<svelte:fragment slot="header">
		<!-- App Bar -->
		{#if appbar}
			<AppBar padding="px-8 md:px-32 p-6">
				<svelte:fragment slot="lead">
					<a class="text-xl uppercase font-bold" href="/"> Linker </a>
				</svelte:fragment>
				<svelte:fragment slot="trail">
					{#if session}
						<!--                     <a href="/profile" class="btn variant-filled-primary">My Profile</a>-->
						<!--                    <SignOut class="btn variant-glass-surface"/>-->
						<a href="/profile">
							<img
								src={session?.user?.image ? session.user.image : getDefaultAvatar(120)}
								alt="${session?.user?.name} profile"
								class="size-14 rounded-full shadow-none hover:drop-shadow-md shadow-primary-200 transition-all duration-100"
							/>
						</a>
					{:else}
						<SignIn class="btn variant-ghost-secondary pl-3" />
					{/if}
				</svelte:fragment>
			</AppBar>
		{/if}
	</svelte:fragment>
	<!-- Page Route Content -->

	{#if $navigating}
		<div class="flex justify-center items-center h-full pb-36">
			<h1 class="h2">
				<LoadingText />
			</h1>
		</div>
	{:else}
		<slot />
	{/if}
</AppShell>
