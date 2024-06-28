import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import getLinks from "$lib/stores/getLinks";

export const GET: RequestHandler = async ({ request }) => {
    const url = new URL(request.url);
    const userId = url.searchParams.get('userId');

    if (!userId) {
        return error(400, 'User ID is required');
    }

	return new Response(JSON.stringify(await getLinks(userId)));
};
