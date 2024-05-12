import type { ZodIssue } from 'zod';

export function issuesToStrings(issues: ZodIssue[]): string[] {
	const messages: string[] = [];

	for (const issue of issues) {
		messages.push(issue.message);
	}

	return messages;
}
