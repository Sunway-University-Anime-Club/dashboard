import { relations } from 'drizzle-orm';
import { pgTable, text, timestamp, uniqueIndex, varchar } from 'drizzle-orm/pg-core';
import { memberInterestedActivities } from './members_activities';

export const members = pgTable(
	'members',
	{
		studentId: varchar('student_id', { length: 8 }).primaryKey(),
		firstName: varchar('first_name', { length: 45 }).notNull(),
		lastName: varchar('last_name', { length: 45 }).notNull(),
		course: varchar('course', { length: 100 }).notNull(),
		phone: varchar('phone', { length: 15 }).notNull(),
		discord: varchar('discord', { length: 32 }).notNull(),
		joinReason: text('join_reason'),
		proofOfPayment: varchar('proof_of_payment', { length: 255 }).notNull(),
		favHusbandoWaifu: varchar('fav_husbando_waifu', { length: 32 }).notNull(),
		registerationDate: timestamp('registeration_date').notNull().defaultNow()
	},
	(members) => {
		return {
			studentIdIndex: uniqueIndex('student_id_idx').on(members.studentId)
		};
	}
);

export const membersRelations = relations(members, ({ many }) => ({
	memberInterestedActivities: many(memberInterestedActivities)
}));
