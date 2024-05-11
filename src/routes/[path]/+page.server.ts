// import {prisma} from "$lib/server/prisma";
// import type {Link, User} from "@prisma/client";
// import {error} from "@sveltejs/kit";



/** @type {import('./$types').PageLoad} */
export async function load({}) {
    // const path = params.path;
    //
    // const result: User | null = await prisma.user.findUnique({
    //     where: {
    //         pagePath: path
    //     }
    // })
    //
    // if (!result) {
    //     error(404, {
    //         message: "This page doesn't exist"
    //     })
    // }
    //
    // const links: Link[] = await prisma.link.findMany({
    //     where: {
    //         userId: result.id
    //     }
    // })
    //
    // return {
    //     user: {
    //         email: result.email,
    //         title: result.linkPageTitle,
    //         description: result.linkPageDescription
    //     },
    //     links
    // }
}

