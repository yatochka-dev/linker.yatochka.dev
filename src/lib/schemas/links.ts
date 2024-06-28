import { z } from 'zod';

const addLinkSchema = z.object({
	url: z.string().url('Invalid URL format'),
	label: z
		.string()
		.min(1, 'Label must be between 1 and 20 characters')
		.max(20, 'Label must be between 1 and 20 characters')
});

const updateLinkSchema = z.object({
	id: z.string(),
	url: z.string().url(),
	label: z.string().min(1).max(20)
});

const deleteLinkSchema = z.object({
	id: z.string()
});

const moveLinkSchema = z.object({
	id: z.string(),
})

export { addLinkSchema, updateLinkSchema, deleteLinkSchema, moveLinkSchema };
