<script lang="ts">
    import '../app.postcss';
    import {AppShell, AppBar} from '@skeletonlabs/skeleton';
    import {QueryClient, QueryClientProvider} from '@tanstack/svelte-query'
    import {browser} from '$app/environment'

    // Highlight JS
    import hljs from 'highlight.js/lib/core';
    import 'highlight.js/styles/github-dark.css';
    import {storeHighlightJs} from '@skeletonlabs/skeleton';
    import xml from 'highlight.js/lib/languages/xml'; // for HTML
    import css from 'highlight.js/lib/languages/css';
    import javascript from 'highlight.js/lib/languages/javascript';
    import typescript from 'highlight.js/lib/languages/typescript';
    import LoadingText from '$lib/components/loading-text.svelte';
    import {base} from "$app/paths";

    hljs.registerLanguage('xml', xml); // for HTML
    hljs.registerLanguage('css', css);
    hljs.registerLanguage('javascript', javascript);
    hljs.registerLanguage('typescript', typescript);
    storeHighlightJs.set(hljs);

    // Floating UI for Popups
    import {computePosition, autoUpdate, flip, shift, offset, arrow} from '@floating-ui/dom';
    import {storePopup} from '@skeletonlabs/skeleton';
    import {navigating, page} from '$app/stores';
    import {SignIn} from '@auth/sveltekit/components';
    import {getDefaultAvatar} from '$lib/utils/avatar';

    import {initializeStores, Modal} from '@skeletonlabs/skeleton';

    initializeStores();
    storePopup.set({computePosition, autoUpdate, flip, shift, offset, arrow});

    $: session = $page.data.session;

    $: appbar = $page.route.id !== '/d/[path]';

    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                enabled: browser,
            },
        },
    })

</script>

<svelte:head>
        <title>Linker</title>
        <meta name="description"
              content="Linker is a simple and easy to use app that allows you to create your own custom link pages.">

        <!-- Facebook Meta Tags -->
        <meta property="og:url" content="https://linker-yatochka-dev.vercel.app/">
        <meta property="og:type" content="website">
        <meta property="og:title" content="Linker">
        <meta property="og:description"
              content="Linker is a simple and easy to use app that allows you to create your own custom link pages.">
        <meta property="og:image" content="https://linker-yatochka-dev.vercel.app/landing.png">

        <!-- Twitter Meta Tags -->
        <meta name="twitter:card" content="summary_large_image">
        <meta property="twitter:domain" content="linker-yatochka-dev.vercel.app">
        <meta property="twitter:url" content="https://linker-yatochka-dev.vercel.app/">
        <meta name="twitter:title" content="Linker">
        <meta name="twitter:description"
              content="Linker is a simple and easy to use app that allows you to create your own custom link pages.">
        <meta name="twitter:image" content="https://linker-yatochka-dev.vercel.app/landing.png">
    </svelte:head>

<QueryClientProvider client={queryClient}>



    <!-- App Shell -->
    <Modal/>
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
                            <a href="/profile">
                                <img
                                        src={session?.user?.image ? session.user.image : getDefaultAvatar(120)}
                                        alt="${session?.user?.name} profile"
                                        class="size-14 rounded-full shadow-none hover:drop-shadow-md shadow-primary-200 transition-all duration-100"
                                />
                            </a>
                        {:else}
                            <SignIn class="btn variant-ghost-secondary pl-3"/>
                        {/if}
                    </svelte:fragment>
                </AppBar>
            {/if}
        </svelte:fragment>
        {#if $navigating}
            <div class="flex justify-center items-center h-full pb-36">
                <h1 class="h2">
                    <LoadingText/>
                </h1>
            </div>
        {:else}
            <slot/>
        {/if}
    </AppShell>
</QueryClientProvider>
