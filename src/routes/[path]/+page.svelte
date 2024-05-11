<script lang="ts">
    import type {PageData} from './$types';


    export let data: PageData;
    const email = "Hello"
    const title = "Hello"
    const description = "Hello"
    const links = "Hello"

</script>

<div class="w-full flex justify-center">
    <div class="flex justify-center flex-col gap-2 pb-10 max-w-[500px]  lg:max-w-[650px] h-links-page">

        {#if email === "Hello"}
            <div class="flex px-6 w-full justify-center">
                <p class="text-sm mb-10 text-center">This is your page, you can <a href="/profile"
                                                                                   class="underline">edit</a> it.</p>
            </div>
        {/if}

        <h1 class="text-4xl text-center lg:text-6xl">{title}</h1>

        <p class="text-xl text-center lg:text-2xl font-light">{description}</p>

        <div class="flex items-center flex-col py-10 px-6 gap-6">
            {#each links as link}

                <a href={link.url} class="btn variant-ghost-primary w-full gap-1">
                    {#if !!link.iconURL}
                        <span><img src={link.iconURL} alt="Link icon" class="size-5"></span>
                    {/if}
                    <span>{link.label}</span>

                </a>


            {/each}
        </div>

    </div>
</div>

