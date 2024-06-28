import {writable} from "svelte/store";
import {type Link} from "@prisma/client";

export const links = writable<Link[]>([]);