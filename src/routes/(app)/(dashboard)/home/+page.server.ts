import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions = {
	logout: async ({ locals: { supabase } }) => {
		const { error } = await supabase.auth.signOut();
		if (error) return fail(400, { message: error.message });
		throw redirect(303, '/');
	}
} satisfies Actions;
