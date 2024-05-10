// restrict for non-authenticated users

import {fail, redirect} from '@sveltejs/kit';
import type {PageServerLoad} from './$types';
import {prisma} from "$lib/server/prisma";
import type {Actions} from "./$types";


export const load: PageServerLoad = async (event) => {
    const session = await event.locals.auth();
    if (!session?.user) throw redirect(303, '/auth/signin');

    const user = await prisma.user.findUnique({
        where: {
            email: session.user.email,
        },


    })

    const links = await prisma.link.findMany({
        where: {
            userId: user.id
        }
    })

    return {
        user: {
            ...user,
            links: links
        }
    };
};

export const actions = {
    deleteLink: async (event) => {
        const id = event.url.searchParams.get("id");
        if (!id) return fail(400, {
            message: "id is required"
        });

        await prisma.link.delete({
            where: {
                id
            }
        });
    }
} satisfies Actions;