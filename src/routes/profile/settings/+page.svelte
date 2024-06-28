<script lang="ts">
    import GoBackToProfile from '$lib/components/go-back-to-profile.svelte';
    import type {ActionData, PageData} from './$types';
    import {onMount} from 'svelte';
    import {debounce} from '$lib/utils/debounce';
    import {fade} from 'svelte/transition';
    import {PageDesign} from '@prisma/client';
    import {type AutocompleteOption} from '@skeletonlabs/skeleton';

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


    let avatar: string = data.user.image;
    let uploading = false;
    import {createUploadThing} from "$lib/utils/uploadthing";

    const {
        startUpload
    } = createUploadThing("imageUploader", {
        onUploadBegin: () => {
            uploading = true;
        },
        onClientUploadComplete: (res) => {
            uploading = false;
            avatar = res[0].url;
            alert(
                "You successfully updated your avatar! (no need to save, it's saved automatically)"
            )
        },
        onUploadError: (error: Error) => {
            alert(`ERROR! ${error.message}`);
            uploading = false;
        },
    });

</script>

<GoBackToProfile/>

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
        <label class="flex flex-col justify-start pt-4 pb-5  w-[max-content]  " role={undefined}>

            <div class="relative group cursor-pointer ">
                <img src={avatar} alt="Upload your avatar" class="max-w-[150px] rounded-full cursor-pointer group-hover:opacity-75 transition-all duration-300">
            <pre class="absolute top-0 left-0 w-full h-full  flex justify-center items-center opacity-0 transition-all duration-300 group-hover:opacity-100">
                <p class="text-white">Click to upload</p>
            </pre>
            </div>
            <input type="file" class="hidden" accept="image/*" on:change={async (e) => {
    const file = e.currentTarget.files?.[0];
    if (!file) return;

    // Do something with files

    // Then start the upload
    await startUpload([file], {userId: data.user.id});
  }}>
            {#if uploading}
                <p>Uploading your new avatar, please wait...</p>
            {/if}
        </label>

        <input type="hidden" name="avatar" bind:value={avatar}/>
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
            <input class="input" type="text" placeholder="my-cool-page" name="path" bind:value={path}/>
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

        <input type="hidden" value={data.user.id} name="id"/>
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

