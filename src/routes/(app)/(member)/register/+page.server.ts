import { db } from '$lib/server/db';
import { phoneCodes } from '$lib/server/phone_codes';
import { memberInterestedActivities, members } from '$lib/server/schema';
import { fail } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const activities = await db.query.activities.findMany();
	return { activities, phoneCodes };
};

export const actions = {
	register: async ({ request, locals: { supabase } }) => {
		// Get data of form submission
		const formData = await request.formData();
		const rawData = Object.fromEntries(formData);

		// Check if the student id provided is valid
		const studentIdRegex = /^\d{8}$/;
		const studentId = rawData['studentId'].toString().trim();
		if (!studentIdRegex.test(studentId)) {
			return fail(400, { message: 'An invalid Student ID has been provided.' });
		}

		// Check if student is already registered
		const member = await db.query.members.findFirst({ where: eq(members.studentId, studentId) });
		if (typeof member !== 'undefined') {
			return fail(409, { message: 'You have already registered previously.' });
		}

		// Form the full phone number with the phone code
		const phone = `${rawData['phoneCode']} ${rawData['phoneNumber'].toString().trim()}`;

		// Get all the activity ids as an array of number
		const activityIds = Object.keys(rawData)
			.filter((key) => key.startsWith('activity-'))
			.map((key) => parseInt(key.split('-').pop()?.trim() ?? ''))
			.filter((key) => typeof key !== 'undefined' || !isNaN(key));

		// Create the bucket for proof of payments if not found
		const { error } = await supabase.storage.getBucket('proof_of_payments');
		if (error && error.message === 'Bucket not found') {
			const { error } = await supabase.storage.createBucket('proof_of_payments', { public: true });
			if (error) return fail(400, { message: error.message });
		}

		// Form the full name
		const firstName = rawData['firstName'].toString().trim();
		const surname = rawData['surname'].toString().trim();
		const fullName = `${firstName} ${surname}`;

		// Extract extension of the file
		const pop = rawData['pop'] as File;
		const ext = pop.name.split('.').pop() ?? (pop.type === 'application/pdf' ? 'pdf' : 'png');

		// Upload the file to the supabase bucket
		const { data, error: err } = await supabase.storage
			.from('proof_of_payments')
			.upload(`/payments/Payment_${studentId}_${fullName}.${ext}`, pop, {
				cacheControl: '3600',
				contentType: pop.type
			});
		if (err) return fail(400, { message: err.message });

		// Get the public url of the uploaded file
		const {
			data: { publicUrl }
		} = supabase.storage.from('proof_of_payments').getPublicUrl(data.path);

		// Open a transaction to save member to database
		return await db
			.transaction(async (tx) => {
				await tx.insert(members).values({
					studentId,
					firstName,
					lastName: surname,
					course: rawData['course'].toString().trim(),
					phone,
					discord: rawData['discord'].toString().trim(),
					joinReason: rawData['reason'].toString().trim(),
					proofOfPayment: publicUrl,
					favHusbandoWaifu: rawData['favHusWaifu'].toString().trim()
				});

				await tx
					.insert(memberInterestedActivities)
					.values(activityIds.map((activityId) => ({ studentId, activityId })));
			})
			.then(() => ({ message: 'You have been registered!' }))
			.catch((e) => {
				console.error(e);
				return fail(400, { message: 'Something went wrong saving your data. Please try again.' });
			});
	}
} satisfies Actions;
