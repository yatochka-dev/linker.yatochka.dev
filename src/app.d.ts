// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
import type {PrismaClient} from "@prisma/client"

declare namespace App {
    interface Locals {
        pb: import("pocketbase").default;
    }

    // interface PageData {}
    // interface Error {}
    // interface Platform {}
    let prisma: PrismaClient
}
