import {prisma} from "$lib/server/prisma";
import {type Link} from "@prisma/client";

export default async function getLinks(
    userId: string,
): Promise<Link[]> {
    return await prisma.link.findMany({
        where: {
            userId: userId
        },
        orderBy: {
            order: 'asc'
        }
    })
}