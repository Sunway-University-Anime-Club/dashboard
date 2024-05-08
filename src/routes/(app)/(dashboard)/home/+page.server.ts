import { db } from '$lib/server/db';
import type { PageServerLoad } from './$types';

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
