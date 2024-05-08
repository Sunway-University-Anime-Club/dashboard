import { fetchMembers } from '$lib/utils';
import { error } from '@sveltejs/kit';
import { json2csv } from 'json-2-csv';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url }) => {
	const fileType = url.searchParams.get('type') ?? '';
	if (!['csv', 'json'].includes(fileType)) {
		throw error(400, { message: 'Not a valid file type request.' });
	}

	const members = await fetchMembers();
	const now = new Date();
	const nowFormatted = new Date(now.getTime() - now.getTimezoneOffset() * 60000)
		.toISOString()
		.split('.')[0]
		.replace(/[T:]/g, '-');
	const fileName = `${nowFormatted}_suac-members-table-export.${fileType}`;

	let mimeType: 'text/csv' | 'application/json';
	let data: string;

	switch (fileType as 'csv' | 'json') {
		case 'csv': {
			mimeType = 'text/csv';
			data = json2csv(
				members.map((member) => {
					const {
						studentId,
						course,
						discord,
						favHusbandoWaifu,
						firstName,
						lastName,
						joinReason,
						memberInterestedActivities,
						phone,
						proofOfPayment,
						registerationDate
					} = member;

					return {
						'Registration Date': registerationDate,
						'Student ID': studentId,
						'First Name': firstName,
						Surname: lastName,
						Course: course,
						'Phone Number': phone,
						'Discord Username': discord,
						'Interested Activities': memberInterestedActivities
							.map((activities) => activities.activity.name)
							.join(', '),
						'Reason for Joining': joinReason,
						'Proof of Payment': proofOfPayment,
						'Favourite Husbando / Waifu': favHusbandoWaifu
					};
				})
			);
			break;
		}
		case 'json': {
			mimeType = 'application/json';
			data = JSON.stringify(members);
			break;
		}
	}

	const file = new File([data], fileName, { type: mimeType });
	return new Response(Buffer.from(await file.arrayBuffer()), {
		status: 200,
		headers: {
			'Content-Type': mimeType,
			'Content-Disposition': `attachment; filename=${encodeURIComponent(fileName)}`
		}
	});
};
