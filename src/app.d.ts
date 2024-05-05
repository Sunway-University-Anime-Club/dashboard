// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

import { Session, SupabaseClient, User } from '@supabase/supabase-js';

// and what to do when importing types
declare global {
	namespace App {
		interface Locals {
			supabase: SupabaseClient;
			session: Session | null;
			user: User | null;

			safeGetSession: () => Promise<{
				session: Session | null;
				user: User | null;
			}>;
		}
		// interface PageData {}
		// interface Error {}
		// interface Platform {}
	}
}

export {};
