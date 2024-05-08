import { db } from '$lib/server/db';
import type { PageServerLoad } from './$types';

const formatDate = (date: Date) => {
	const monthNames = [
		'Jan',
		'Feb',
		'Mar',
		'Apr',
		'May',
		'Jun',
		'Jul',
		'Aug',
		'Sep',
		'Oct',
		'Nov',
		'Dec'
	];

	const day = String(date.getDate()).padStart(2, '0');

	const monthIndex = date.getMonth();
	const monthName = monthNames[monthIndex];

	const year = date.getFullYear();

	return `${day} ${monthName} ${year}`;
};

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
				registerationDate: formatDate(member.registerationDate),
				activities: member.memberInterestedActivities
					.map((activities) => activities.activity.name)
					.join(', ')
			};
		}),
		yearFilters: [
			...new Set(members.map((member) => String(member.registerationDate.getFullYear())))
		]
	};
};
