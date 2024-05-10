import {SvelteKitAuth} from "@auth/sveltekit"
import {PrismaAdapter} from "@auth/prisma-adapter"
import {PrismaClient} from "@prisma/client"

const prisma = new PrismaClient()
import Discord from "@auth/sveltekit/providers/discord"
import {AUTH_DISCORD_ID, AUTH_DISCORD_SECRET} from "$env/static/private"


export const {handle, signIn, signOut} = SvelteKitAuth({
    adapter: PrismaAdapter(prisma),
    providers: [Discord({
        clientId: AUTH_DISCORD_ID,
        clientSecret: AUTH_DISCORD_SECRET,
    })],
    debug: true,
})