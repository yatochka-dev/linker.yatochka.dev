import {createUploadthing} from "uploadthing/server";
import type {FileRouter} from "uploadthing/server";
import {prisma} from "$lib/server/prisma";
import { UploadThingError } from "uploadthing/server";
import {z} from "zod";

const f = createUploadthing();


// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
    // Define as many FileRoutes as you like, each with a unique routeSlug
    imageUploader: f({image: {maxFileSize: "4MB"}})
        .input(z.object({
            userId: z.string()
        }))
        // Set permissions and file types for this FileRoute
        .middleware(async ({input}) => {
            // This code runs on your server before upload

            return {userId: input.userId};
        })
        .onUploadComplete(async ({metadata, file}) => {
            // This code RUNS ON YOUR SERVER after upload
            await prisma.user.update({
                where: {
                    id: metadata.userId
                },
                data: {
                    image: file.url
                }
            })
        }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;