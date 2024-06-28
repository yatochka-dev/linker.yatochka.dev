import { env } from "$env/dynamic/private";
import { ourFileRouter } from "$lib/server/uploadthing";

import { createRouteHandler } from "uploadthing/server";

// The Svelte extension complains if you export the handlers directly
const { GET, POST } = createRouteHandler({
  router: ourFileRouter,
  config: {
    uploadthingSecret: env.UPLOADTHING_SECRET,
    logLevel: "debug",
  },
});

const p = async (request: Request) => {

  console.log(request.url);
  console.log(request.method);
  console.log(request.headers);
  const body = await request.text();
  console.log(body);

  await POST(request);
}

export { GET, p as POST };