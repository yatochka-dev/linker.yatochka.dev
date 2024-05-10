<script lang="ts">
   	import { popup, type PopupSettings } from '@skeletonlabs/skeleton';

    import type {Link} from "@prisma/client";
    import {Avatar} from "@skeletonlabs/skeleton";

    //  Props
    export let link: Link;


    let confirmDelete = false;

    const popupClick: PopupSettings = {
        event: 'click',
        target: 'popupClick',
        placement: 'bottom',
        	closeQuery: '#will-close'

    };


</script>

<div class="flex flex-row gap-4 border-secondary-50 border-2 rounded-lg p-3">
    <div class="flex items-center gap-2">
        <Avatar src={link.iconURL ?? ""} width="w-7"/> {link.label}
    </div>
    <div class="flex-grow"></div>
    <div class="btn-group variant-ghost-secondary">
        <a href={link.url} target="_blank" class="btn-sm btn btn-primary">Visit</a>
        <a href={`profile/edit-link/${link.id}`} class="btn btn-secondary">Edit</a>
    </div>
    <!--    <form method="POST" action="?/deleteLink&id={link.id}">-->
    <button class="btn variant-filled-error" use:popup={popupClick} >Delete</button>

    <div class="card p-4 variant-filled-surface" data-popup="popupClick">
        <p class="mb-2">Are you sure you want to delete this link?</p>
            <form method="POST" action="?/deleteLink&id={link.id}" class="flex items-center justify-center gap-4">
            <button class="btn variant-filled-error" type="submit">Yes</button>
            <button class="btn variant-filled-secondary" id="will-close" type="button">No</button>
            </form>

        <div class="arrow variant-filled-primary"/>
    </div>

    <!--    </form>-->
</div>