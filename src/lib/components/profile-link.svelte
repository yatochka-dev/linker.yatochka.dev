<script lang="ts">
    import {enhance} from '$app/forms';
    import {type Link} from '@prisma/client';
    import clsx from "clsx";

    //  d
    export let link: Link;
    export let links: Link[];
    export let index: number;

    // async function onOrderChange(
    //     id: string,
    //     toOrder: number,
    //     fromOrder: number
    // ) {
    //     console.log("call")
    //     // there can be a link with the order than this link wants
    //
    //     // if (toOrder <= 1 || toOrder >= $links.length) {
    //     //     return;
    //     // }
    //
    //     console.log("toOrder", toOrder)
    //     console.log("fromOrder", fromOrder)
    //
    //     const newOrderCurrentLink = $links.find((link) => link.order === toOrder);
    //     const linkToBeMoved = $links.find((link) => link.order === fromOrder);
    //
    //     // remove the links from the array
    //
    //     console.log("newOrderCurrentLink", newOrderCurrentLink)
    //     console.log("linkToBeMoved", linkToBeMoved)
    //
    //     if (!newOrderCurrentLink || !linkToBeMoved) {
    //         return;
    //     }
    //
    //     if (newOrderCurrentLink?.id === id) {
    //         return;
    //     }
    //
    //
    //     newOrderCurrentLink.order = fromOrder;
    //     linkToBeMoved.order = toOrder
    //
    //     const newArray = [...$links].filter((link) => link.order !== fromOrder && link.order !== toOrder);
    //     newArray.push(linkToBeMoved);
    //     newArray.push(newOrderCurrentLink);
    //     newArray.sort((a, b) => a.order - b.order);
    //     console.log("newArray", newArray)
    //
    //     console.log(newArray);
    //     links.set(newArray);
    //
    //
    //
    //     await $mutation.mutateAsync({
    //         id,
    //         newOrder: toOrder
    //     });
    // }

</script>


<form class="p-4 w-full rounded-sm flex lg:flex-row flex-col" method="POST" use:enhance>

    <div class="w-full lg:w-[75%] flex items-center gap-2">
        <input class="input w-[30%]" type="text" bind:value={link.label} name="label"/>
        - <input class="input w-[70%]" type="url" bind:value={link.url} name="url"/>
    </div>
   <div class="flex gap-2 ">
        <div class="flex text-center gap-1 text-xl">
            <button disabled={link.order === 1}
                    formaction="?/moveLinkUp"
                class={clsx([link.order ===1 ? "text-gray-500" : "variant-filled-secondary", "btn btn-sm "])}
            >
                &uparrow;
            </button>
            <button
                        formaction="?/moveLinkDown"

                    disabled={link.order >= links.length}      class={clsx([link.order === links.length ? "text-gray-500" : "variant-filled-secondary", "btn btn-sm "])}
            >
                &downarrow;
            </button>
        </div>
    <div class="flex-grow"></div>
    <input type="hidden" class="hidden" bind:value={link.id} name="id"/>
    <div class="flex gap-2">

        <button class="btn variant-filled-secondary" type="submit" formaction="?/updateLink"
        >Update
        </button
        >
        <button class="btn variant-filled-error" type="submit" formaction="?/deleteLink">Remove</button>
    </div>

   </div>

</form>
