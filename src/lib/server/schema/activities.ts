import { relations } from 'drizzle-orm';
import { jsonb, pgTable, serial, varchar } from 'drizzle-orm/pg-core';
import { memberInterestedActivities } from './members_activities';

export const activities = pgTable('activities', {
	id: serial('id').primaryKey(),
	name: varchar('name', { length: 64 }),
	examples: jsonb('examples').$type<string[]>().default([]).notNull()
});

export const activitiesRelations = relations(activities, ({ many }) => ({
	memberInterestedActivities: many(memberInterestedActivities)
}));
