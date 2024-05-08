import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

const EMAIL_SUFFIX = 'sunwayanime.com';

export const load: PageServerLoad = async ({ locals: { session } }) => {
	// If user is logged in, redirect them to the home page
	if (session) throw redirect(303, '/home');
	return { emailSuffix: EMAIL_SUFFIX };
};

export const actions = {
	login: async ({ request, locals: { supabase } }) => {
		// Get the email and password from the form submission
		const formData = await request.formData();
		const username = formData.get('username') as string;
		const password = formData.get('password') as string;

		// Form the full email using the username
		const email = `${username}@${EMAIL_SUFFIX}`;

		// Try to sign the user in with the provided email and password
		const { error } = await supabase.auth.signInWithPassword({ email, password });
		if (error) return fail(401, { message: 'Wrong email or password provided.' });
		throw redirect(303, '/home');
	},
	logout: async ({ locals: { supabase } }) => {
		const { error } = await supabase.auth.signOut();
		if (error) return fail(400, { message: error.message });
	}
} satisfies Actions;
