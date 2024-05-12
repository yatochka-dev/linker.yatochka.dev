import { z } from 'zod';

export const validatePath = z
	.string()
	.min(5, 'Path must be at least 5 characters long')
	.max(50, 'Path must be at most 50 characters long')
	.regex(
		/^[a-z0-9]+(?:-[a-z0-9]+)*$/,
		'Path must only contain lowercase letters, numbers and hyphens, and cannot start or end with a hyphen.'
	);
