import { type Actions, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { prisma } from '$lib/server/prisma';
import type { Link } from '@prisma/client';
import { addLinkSchema, deleteLinkSchema, updateLinkSchema } from '$lib/schemas/links';
import { issuesToStrings } from '$lib/utils/errors';
import determineLinkType from '$lib/utils/determineLinkType';

export const load: PageServerLoad = async (event) => {
	const session = await event.locals.auth();
	if (!session?.user) throw redirect(303, '/auth/signin');

	const links: Link[] = await prisma.link.findMany({
		where: {
			user: {
				email: session.user.email
			}
		}
	});

	return {
		links: links
	};
};

export const actions = {
	addLink: async (event) => {
		const session = await event.locals.auth();
		if (!session?.user) throw redirect(303, '/auth/signin');
		const body = await event.request.formData();
		const entries = Object.fromEntries(body);
		const { success, data, error } = await addLinkSchema.safeParseAsync(entries);

		if (!success && error) {
			return {
				add: {
					error: true,
					messages: issuesToStrings(error.errors)
				}
			};
		}

		const link = await prisma.link.create({
			data: {
				url: data.url,
				label: data.label,
				type: determineLinkType(data.url),
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
		const { success, data, error } = await deleteLinkSchema.safeParseAsync(entries);

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
		const { success, data, error } = await updateLinkSchema.safeParseAsync(entries);

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
	}
} satisfies Actions;
