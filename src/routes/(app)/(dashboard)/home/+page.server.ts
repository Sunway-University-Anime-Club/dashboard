import { db } from '$lib/server/db';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const members = await db.query.members.findMany({
		with: {
			memberInterestedActivities: {
				columns: {},
				with: {
					activity: {
						columns: {
							id: false
						}
					}
				}
			}
		}
	});

	return {
		members: members.map((member) => {
			return {
				...member,
				activities: member.memberInterestedActivities
					.map((activities) => activities.activity.name)
					.join(', ')
			};
		})
	};
};

export const actions = {
	logout: async ({ locals: { supabase } }) => {
		const { error } = await supabase.auth.signOut();
		if (error) return fail(400, { message: error.message });
		throw redirect(303, '/');
	}
} satisfies Actions;
