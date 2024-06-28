import {type Actions, redirect} from '@sveltejs/kit';
import type {PageServerLoad} from './$types';
import {prisma} from '$lib/server/prisma';
import type {Link} from '@prisma/client';
import {addLinkSchema, deleteLinkSchema, moveLinkSchema, updateLinkSchema} from '$lib/schemas/links';
import {issuesToStrings} from '$lib/utils/errors';
import determineLinkType from '$lib/utils/determineLinkType';
import getLinks from "$lib/stores/getLinks";

export const load: PageServerLoad = async (event) => {
    const session = await event.locals.auth();
    if (!session?.user) throw redirect(303, '/auth/signin');
    const userId = (await prisma.user.findUniqueOrThrow({
        where: {
            email: session.user.email
        }
    })).id

    const links: Link[] = await getLinks(userId);

    return {
        links: links,
        userId,
    };
};

export const actions = {
    addLink: async (event) => {
        const session = await event.locals.auth();
        if (!session?.user) throw redirect(303, '/auth/signin');
        const body = await event.request.formData();
        const entries = Object.fromEntries(body);
        const {success, data, error} = await addLinkSchema.safeParseAsync(entries);

        if (!success && error) {
            return {
                add: {
                    error: true,
                    messages: issuesToStrings(error.errors)
                }
            };
        }

        const userLink = await prisma.link.findFirst({
            where: {
                user: {
                    email: session.user.email
                }
            },
            orderBy: {order: 'desc'}, // Order by order in descending order
        });


        const link = await prisma.link.create({
            data: {
                url: data.url,
                label: data.label,
                type: determineLinkType(data.url),
                order: userLink.order + 1,
                user: {
                    connect: {
                        email: session.user.email
                    }
                }
            }
        });

        return {
            add: {
                success: true,
                link: link
            }
        };
    },
    deleteLink: async (event) => {
        const session = await event.locals.auth();
        if (!session?.user) throw redirect(303, '/auth/signin');
        const body = await event.request.formData();
        const entries = Object.fromEntries(body);
        const {success, data, error} = await deleteLinkSchema.safeParseAsync(entries);

        if (!success && error) {
            return {
                delete: {
                    error: true,
                    messages: issuesToStrings(error.errors)
                }
            };
        }

        await prisma.link.delete({
            where: {
                id: data.id
            }
        });

        return {
            delete: {
                success: true
            }
        };
    },
    updateLink: async (event) => {
        const session = await event.locals.auth();
        if (!session?.user) throw redirect(303, '/auth/signin');
        const body = await event.request.formData();
        const entries = Object.fromEntries(body);
        const {success, data, error} = await updateLinkSchema.safeParseAsync(entries);

        if (!success && error) {
            return {
                update: {
                    error: true,
                    messages: issuesToStrings(error.errors)
                }
            };
        }

        const link = await prisma.link.update({
            where: {
                id: data.id
            },
            data: {
                type: determineLinkType(data.url),
                url: data.url,
                label: data.label
            }
        });

        return {
            update: {
                success: true,
                link: link
            }
        };
    },
    moveLinkUp: async (event) => {
        const session = await event.locals.auth();
        if (!session?.user) throw redirect(303, '/auth/signin');
        const body = await event.request.formData();
        const entries = Object.fromEntries(body);
        const {success, data, error} = await moveLinkSchema.safeParseAsync(entries);

        if (!success && error) {
            return {
                moveLinkUp: {
                    error: true,
                    messages: issuesToStrings(error.errors)
                }
            };
        }

        const id = data.id;
        const linksOfUser = await prisma.link.findMany({
            where: {
                user: {
                    email: session.user.email
                }
            },
            orderBy: {
                order: 'asc'
            }
        });
        const currentLink = linksOfUser.find((link: { id: string; }) => link.id === id);
        if (!currentLink) {
            return {
                moveLinkUp: {
                    error: true,
                    messages: ['Link not found']
                }
            };
        }

        const wantedOrder = currentLink.order - 1;
        const newOrderCurrentLink = linksOfUser.find((link: { order: number; }) => link.order === wantedOrder);
        let updatedLink: Link;
        if (newOrderCurrentLink) {

            const res = await prisma.$transaction([
                prisma.link.update({
                    where: {
                        id: id
                    },
                    data: {
                        order: {
                            decrement: 1
                        }
                    }
                }),
                prisma.link.update({
                    where: {
                        id: newOrderCurrentLink.id
                    },
                    data: {
                        order: {
                            increment: 1
                        }
                    }
                })
            ])

            updatedLink = res[0];
        } else {
            updatedLink = await prisma.link.update({
                where: {
                    id: id
                },
                data: {
                    order: {
                        decrement: 1
                    }
                }
            })
        }

        return {
            moveLinkUp: {
                success: true,
                link: updatedLink
            }
        };
    },
    moveLinkDown: async (event) => {
        const session = await event.locals.auth();
        if (!session?.user) throw redirect(303, '/auth/signin');
        const body = await event.request.formData();
        const entries = Object.fromEntries(body);
        const {success, data, error} = await moveLinkSchema.safeParseAsync(entries);

        if (!success && error) {
            return {
                moveLinkDown: {
                    error: true,
                    messages: issuesToStrings(error.errors)
                }
            };
        }
        const id = data.id;
        const linksOfUser = await prisma.link.findMany({
            where: {
                user: {
                    email: session.user.email
                }
            },
            orderBy: {
                order: 'asc'
            }
        });
        const currentLink = linksOfUser.find((link: { id: string; }) => link.id === id);
        if (!currentLink) {
            return {
                moveLinkUp: {
                    error: true,
                    messages: ['Link not found']
                }
            };
        }
        const wantedOrder = currentLink.order + 1;
        const newOrderCurrentLink = linksOfUser.find((link: { order: number; }) => link.order === wantedOrder);
        let updatedLink: Link;
        if (newOrderCurrentLink) {
            const res = await prisma.$transaction([
                prisma.link.update({
                    where: {
                        id: id
                    },
                    data: {
                        order: {
                            increment: 1
                        }
                    }
                }),
                prisma.link.update({
                    where: {
                        id: newOrderCurrentLink.id
                    },
                    data: {
                        order: {
                            decrement: 1
                        }
                    }
                })
            ])
            updatedLink = res[1];
        } else {
            updatedLink = await prisma.link.update({
                where: {
                    id: id
                },
                data: {
                    order: {
                        increment: 1
                    }
                }
            })
        }
        return {
            moveLinkDown: {
                success: true,
                link: updatedLink
            }
        };

    }
} satisfies Actions;
