<script lang="ts">

    let showPassword = false;

    function togglePassword() {
        showPassword = !showPassword;
    }

    $: passwordFieldType = showPassword ? 'text' : 'password';

</script>

<div class="flex flex-col items-center h-full w-full container mx-auto">
    <h2 class="mt-2 text-center text-3xl font-bold tracking-tight ">
        Register for an account
    </h2>
    <p class="text-center mt-1">
        or
        <a href="/login" class="text-primary font-medium cursor-pointer underline">login</a>
        if you already have an account.
    </p>

    <form action="?/register" method="POST" class="flex flex-col items-center space-y-2 w-full pt-4">

        <label class="label w-full">
            <span>Name</span>
            <input class="input w-full " type="text" name="name" placeholder="Name"/>
        </label>

        <label class="label w-full">
            <span>Email</span>
            <input class="input w-full " type="email" name="email" placeholder="Email"/>
        </label>

        <label class="label w-full relative " id="passwordInput">
            <span>Password</span>
            <input class="input w-full " type={passwordFieldType} name="password" placeholder="Password"/>
            <button class="absolute" on:click={togglePassword} type="button">👁️</button>
        </label>

        <label class="label w-full">
            <span>Confirm Password</span>
            <input class="input w-full " type={passwordFieldType} name="passwordConfirm"
                   placeholder="Confirm Password"/>
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