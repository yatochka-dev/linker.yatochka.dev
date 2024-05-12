import { prisma } from '$lib/server/prisma';
import type { Link, User } from '@prisma/client';
import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
	const path = params.path;

	const result: User | null = await prisma.user.findUnique({
		where: {
			pagePath: path
		}
	});

	if (!result) {
		error(404, {
			message: "This page doesn't exist, maybe the user hasn't created it yet."
		});
	}

	const links: Link[] = await prisma.link.findMany({
		where: {
			userId: result.id
		}
	});

	let title = result.linkPageTitle;
	if (title?.length ?? 0 < 1) {
		title = result.name ?? 'Untitled';
	}

	return {
		user: {
			email: result.email,
			title: title,
			description: result.linkPageDescription,
			avatar: result.image,
			design: result.linkPageDesign
		},
		links
	};
}
