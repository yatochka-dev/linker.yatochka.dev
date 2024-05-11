<script lang="ts">

    import type {ActionData} from "../../../.svelte-kit/types/src/routes/login/$types";

    let showPassword = false;

    function togglePassword() {
        showPassword = !showPassword;
    }

    $: passwordFieldType = showPassword ? 'text' : 'password';

    export let form: ActionData;
</script>

<div class="flex flex-col items-center h-full w-full container mx-auto">
    <h2 class="mt-2 text-center text-3xl font-bold tracking-tight ">
        Login to your account
    </h2>
    <p class="text-center mt-1">
        or
        <a href="/login" class="text-primary font-medium cursor-pointer underline">
            register
        </a>
        if you don't already have an account.
    </p>

    <form action="?/login" method="POST" class="flex flex-col items-center space-y-2 w-full pt-4">


        <label class="label w-full">
            <span>Email</span>
            <input class="input w-full " type="email" name="email" placeholder="Email"/>
        </label>

        <label class="label w-full relative " id="passwordInput">
            <span>Password</span>
            <input class="input w-full " type={passwordFieldType} name="password" placeholder="Password"/>
            <button class="absolute" on:click={togglePassword} type="button">👁️</button>
        </label>


        <div class="w-full  pt-2">
            <button type="submit" class="btn variant-filled-primary w-full">Submit</button>
        </div>
    </form>
</div>

<style lang="postcss">

    #passwordInput {
        position: relative;

        & > button.absolute {
            right: 10px;
            top: 66%;
            transform: translateY(-50%);
            cursor: pointer;
        }
    }

</style>