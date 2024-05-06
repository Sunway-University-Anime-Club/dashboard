import { db } from '$lib/server/db';
import { phoneCodes } from '$lib/server/phone_codes';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const activities = await db.query.activities.findMany();
	return { activities, phoneCodes };
};

export const actions = {
	register: async ({ request }) => {
		console.log(await request.formData());
	}
} satisfies Actions;
