<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="absolute top-[15%] left-1/2 -translate-x-1/2">
	<a href={data.usersPageURL} class="btn variant-filled-primary"> Your Page Is Live 🔥 </a>
</div>

<div class="text-center flex flex-col gap-4 items-center justify-center h-full pb-36">
	<h1 class="text-3xl">You profile</h1>
	<div class="text-left flex flex-row justify-between gap-4 px-4 mb-2">
		Edit your page by clicking these two buttons!
	</div>
	<div>
		<a href="/profile/settings" class="btn variant-filled-primary"> Settings </a>
		<a href="/profile/links" class="btn variant-ghost-primary"> Edit Links </a>
		<!--        <h2 class="text-xl mb-4">Links: </h2>-->
		<!--        <div class="grid gap-4">-->
		<!--            {#each links as link}-->
		<!--                <ProfileLink link={link}/>-->
		<!--            {/each}-->
		<!--        </div>-->
	</div>
</div>
