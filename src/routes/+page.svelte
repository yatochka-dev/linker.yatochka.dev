<script lang="ts">

    import Motion from 'svelte-motion/src/motion/MotionSSR.svelte'
    import {Avatar} from "@skeletonlabs/skeleton";
    import {getDefaultAvatar} from "$lib/utils/avatar";
    import SocialLink from "$lib/components/social-link.svelte";
    import type {LinkType} from "@prisma/client";

    const examplePageTitle = "Create Your Page".split(" ");
    const icons: LinkType[] = ["youtube", "instagram", "github"];

    const buttons = [
        "Instagram Page",
        "Youtube Channel",
        "Github Profile",
        "Custom Website"
    ]

    const mainDivConfig = {
        initial: {opacity: 0, y: 100},
        animate: {
            opacity: 1, y: 0,
            transition: {
                when: "beforeChildren",
                staggerChildren: .1
            }

        }

    }

    const avatarConfig = {
        initial: {opacity: 0, scale: .5},
        animate: {
            opacity: 1, scale: 1,
        }
    }

    const titleItemConfig = {
        initial: {opacity: 0, y: 10},
        animate: {
            opacity: 1, y: 0,
        }
    }


    const iconItemsConfig = {
        initial: {opacity: 0, scale: .5},
        animate: {
            opacity: 1, scale: 1,
        }
    }

    const buttonItemsConfig = {
        initial: {opacity: 0, x: 5},
        animate: {
            opacity: 1, x: 0,
            transition: {

            }
        }
    }
</script>

<div class="flex pt-36 flex-col px-10 lg:pt-0 lg:flex-row h-full w-full items-center pb-32 mx-auto max-w-screen-xl gap-20">
    <div class="flex flex-col gap-4 container max-w-screen-sm">
        <h1 class="h2 lg:h1">
            Simple, beautiful, and free link management
        </h1>
        <h6 class="h6">
            Create a page with your links, share it with your friends, and see how many clicks you get (<b>in
            development</b>).
        </h6>
        <div class="flex flex-row gap-4 mt-10">
            <a href="/profile" class="btn variant-filled-primary">Get Started</a>
        </div>
    </div>
    <div class="flex-grow"></div>
    <div>
        <Motion
                variants={mainDivConfig}
                animate="animate"
                initial="initial"
                let:motion
        >
            <div

                    use:motion
                    class="lg:w-96 mx-6 md:mx-0 h-[35rem] w-96 md:w-[30rem] bg-gray-200 rounded-2xl flex flex-col items-center pt-12 px-8 text-surface-900 relative"
            >

<!--                <div class="absolute w-full h-full bg-gray-200"></div>-->
                <Motion let:motion variants={avatarConfig}>

                    <div
                            use:motion

                    >
                        <Avatar src={getDefaultAvatar(120)} width="w-[6rem]"/>
                    </div>
                </Motion>

                <h3 class="h3 mt-4">
                    {#each examplePageTitle as w}
                        <Motion let:motion variants={titleItemConfig}>
                        <span
                                class="inline-block"
                                use:motion
                        >
                        {w}
                    </span>
                        </Motion>
                    {/each}
                </h3>
                <Motion let:motion
                        variants={titleItemConfig}
                >
                    <p class="text-lg" use:motion>-----</p>
                </Motion>
                <div class="flex fill-surface-900 gap-4 mt-2 ml-3">
                    {#each icons as icon}
                        <Motion let:motion
                                variants={iconItemsConfig}
                        >
                            <span class="inline-block size-10 " use:motion>
                            <SocialLink type={icon}/>
                        </span>
                        </Motion>
                    {/each}
                </div>

                <div class="flex flex-col w-full gap-4 mt-6">
<!--                    <button class="btn variant-filled-surface">Instagram Page</button>-->
<!--                    <button class="btn variant-filled-surface">Youtube Channel</button>-->
<!--                    <button class="btn variant-filled-surface">Github Profile</button>-->
<!--                    <button class="btn variant-filled-surface">-->
<!--                        Custom Website-->
<!--                    </button>-->

                    {#each buttons as button}
                        <Motion let:motion
                                variants={buttonItemsConfig}
                        >
                            <div class="btn variant-filled-surface" use:motion>
                                {button}
                            </div>
                        </Motion>
                    {/each}
                </div>

            </div>
        </Motion>
    </div>
</div>
