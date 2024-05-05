import { relations } from 'drizzle-orm';
import { integer, pgTable, primaryKey, varchar } from 'drizzle-orm/pg-core';
import { activities } from './activities';
import { members } from './members';

export const memberInterestedActivities = pgTable(
	'member_interested_activities',
	{
		studentId: varchar('student_id')
			.notNull()
			.references(() => members.studentId),
		activityId: integer('activity_id')
			.notNull()
			.references(() => activities.id)
	},
	(t) => ({
		pk: primaryKey({ columns: [t.studentId, t.activityId] })
	})
);

export const memberInterestedActivitiesRelations = relations(
	memberInterestedActivities,
	({ one }) => ({
		member: one(members, {
			fields: [memberInterestedActivities.studentId],
			references: [members.studentId]
		}),
		activity: one(activities, {
			fields: [memberInterestedActivities.activityId],
			references: [activities.id]
		})
	})
);
