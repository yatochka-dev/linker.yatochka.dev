import type { LinkType } from '@prisma/client';

const _map: Record<LinkType, string[]> = {
	youtube: ['youtube.com', 'youtu.be'],
	twitter: ['twitter.com'],
	instagram: ['instagram.com'],
	twitch: ['twitch.tv'],
	github: ['github.com'],
	linkedin: ['linkedin.com'],
	facebook: ['facebook.com'],
	pinterest: ['pinterest.com'],
	tiktok: ['tiktok.com'],
	snapchat: ['snapchat.com'],
	CUSTOM: []
};

export default function determineLinkType(url: string): LinkType {
	const lowercasedUrl = url.toLowerCase();

	for (const [type, domains] of Object.entries(_map)) {
		if (domains.some((domain) => lowercasedUrl.includes(domain))) {
			return type as LinkType;
		}
	}

	return 'CUSTOM';
}
