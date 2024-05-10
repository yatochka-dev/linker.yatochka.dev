<script lang="ts">

    import type {PageData} from './$types';
    import type {Link} from "@prisma/client";
    import {Avatar} from '@skeletonlabs/skeleton';
    import ProfileLink from '$lib/components/profile-link.svelte';
    export let data: PageData;
    const links: Link[] = data.user.links;



</script>

<div class="text-center flex flex-col gap-4 items-center">
    <h1 class="text-3xl">You page settings</h1>
    <div class="text-left">
        <p>title: <span>{data.user.linkPageTitle}</span></p>
        <p>subtitle: <span>{data.user.linkPageDescription}</span></p>
    </div>
    <div>
        <h2 class="text-xl mb-4">Links: </h2>
        <div class="grid gap-4">
            {#each links as link}
                <ProfileLink link={link}/>
            {/each}
        </div>
    </div>
</div>