import type { PageServerLoad } from '../../../../.svelte-kit/types/src/routes/profile/$types';
import { type Actions, fail, redirect } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';
import { z } from 'zod';
import { validatePath } from '$lib/schemas/settings';
import { PageDesign } from '@prisma/client';

const editSettingsSchema = z.object({
	id: z.string(),
	title: z
		.string()
		.min(5, 'Title must be at least 5 characters long')
		.max(50, 'Title must be at most 50 characters long'),
	description: z
		.string()
		.min(5, 'Description must be at least 5 characters long')
		.max(100, 'Description must be at most 100 characters long'),

	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-expect-error
	design: z.enum(Object.entries(PageDesign).map(([, value]) => value) as const),
	path: validatePath
});

export const load: PageServerLoad = async (event) => {
	const session = await event.locals.auth();
	if (!session?.user) throw redirect(303, '/auth/signin');

	const user = await prisma.user.findUnique({
		where: {
			email: session.user.email
		}
	});

	const links = await prisma.link.findMany({
		where: {
			userId: user.id
		}
	});

	return {
		user: {
			...user,
			links: links
		},
		url: event.url.protocol + '//' + event.url.host
	};
};

export const actions = {
	default: async (event) => {
		const formData = await event.request.formData();
		const entries = Object.fromEntries(formData);

		const { data, success, error } = await editSettingsSchema.safeParseAsync(entries);

		if (!success) {
			const messages: string[] = [];
			const errors = error.errors;
			// const field = `${e.path.at(0) ?? "Data"}: `

			for (const e of errors) {
				messages.push(e.message);
			}

			return fail(400, {
				error: true,
				messages
			});
		}

		const { id, title, description, path } = data;
		const count = await prisma.user.count({
			where: {
				pagePath: path,
				id: {
					not: id
				}
			}
		});

		if (count != 0) {
			return fail(400, {
				error: true,
				messages: ['Path already exists']
			});
		}

		await prisma.user.update({
			where: {
				id
			},
			data: {
				linkPageTitle: title,
				linkPageDescription: description,
				pagePath: path,
				linkPageDesign: data.design
			}
		});

		redirect(303, '/profile');
	}
} satisfies Actions;
