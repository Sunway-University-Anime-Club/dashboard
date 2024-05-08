import { db } from '$lib/server/db';

export const fetchMembers = async () => {
	return await db.query.members.findMany({
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
};
