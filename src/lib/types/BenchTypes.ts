import type { Bench } from '@prisma/client';

export type BenchFormData = {
	title: null | string;
	open_hours: null | string;
	closing_hours: null | string;
	location: {
		lat: number;
		lng: number;
	};
	tags: Array<{ slug: string }>;
	userId: string | null;
};
