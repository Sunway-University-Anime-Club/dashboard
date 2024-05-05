import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals: { session } }) => {
	// If user is logged in, redirect them to the home page
	if (session) throw redirect(303, '/home');
};

export const actions = {
	login: async ({ request, locals: { supabase } }) => {
		// Get the email and password from the form submission
		const formData = await request.formData();
		const email = formData.get('email') as string;
		const password = formData.get('password') as string;

		// Try to sign the user in with the provided email and password
		const { error } = await supabase.auth.signInWithPassword({ email, password });
		if (error) return {};
		throw redirect(303, '/home');
	}
} satisfies Actions;
