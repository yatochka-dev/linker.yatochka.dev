import {type Actions, error, redirect} from "@sveltejs/kit";
import {generateUsername} from "$lib/utils/username";
import {z} from "zod";

const registerSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(8),
    passwordConfirm: z.string().min(8)
})

export const actions: Actions = {
    register: async ({locals, request}) => {

        const entries = Object.fromEntries(await request.formData())
        console.log("ENTRIES", entries)

        const body = registerSchema.parse(entries)

        const username = generateUsername(body.email).toLowerCase();

        try {
            await locals.pb.collection("users").create({
                username, ...body
            })
            // await locals.pb.collection("users").requestVerification(body.email);
        } catch (err) {
            console.error("Register error", err)
            throw error(500, "An error occurred while registering. Please try again later.")
        }


        throw redirect(303, "/login")
    }
}