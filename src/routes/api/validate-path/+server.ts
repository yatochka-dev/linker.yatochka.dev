import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { prisma } from '$lib/server/prisma';
import { validatePath } from '$lib/schemas/settings';

export const POST: RequestHandler = async ({ request }) => {
	const data = await request.json();

	const { success } = await validatePath.safeParseAsync(data.path);

	if (!success) {
		return error(400, 'Invalid path');
	}

	const count = await prisma.user.count({
		where: {
			pagePath: data.path,
			id: {
				not: data.id
			}
		}
	});

	if (count != 0) {
		return error(400, 'Path already exists');
	}
	return new Response('ok');
};
