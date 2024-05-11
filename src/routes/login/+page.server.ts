import {type Actions, error, redirect} from "@sveltejs/kit";
import {z} from "zod";

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8)
})


export const actions: Actions = {
    login: async ({locals, request}) => {
        const body = loginSchema.parse(Object.fromEntries(await request.formData()))


        try {
            await locals.pb.collection("users").authWithPassword(body.email, body.password)
        } catch (err) {
            console.error("Login error", err)
            throw error(500, "An error occurred while logging in. Please try again later.")
        }

        throw redirect(303, "/")
    }
}