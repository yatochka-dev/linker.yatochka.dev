import { SvelteKitAuth } from '@auth/sveltekit';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
import Discord from '@auth/sveltekit/providers/discord';
import Google from '@auth/sveltekit/providers/google';
import { AUTH_DISCORD_ID, AUTH_DISCORD_SECRET,AUTH_GOOGLE_ID, AUTH_GOOGLE_SECRET  } from '$env/static/private';

export const { handle, signIn, signOut } = SvelteKitAuth({
	adapter: PrismaAdapter(prisma),
	providers: [
		Discord({
			clientId: AUTH_DISCORD_ID,
			clientSecret: AUTH_DISCORD_SECRET,
			allowDangerousEmailAccountLinking: true,
		}),
		Google({
			clientId: AUTH_GOOGLE_ID,
			clientSecret: AUTH_GOOGLE_SECRET,
			allowDangerousEmailAccountLinking: true
		})
	],
	// debug: true,
	trustHost: true
});
