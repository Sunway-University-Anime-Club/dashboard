import { env } from '$env/dynamic/private';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

export const client = postgres(env.SUPABASE_DB_URI, { prepare: false });
export const db = drizzle(client, { schema });
