import dotenv from 'dotenv';
import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';
import * as schema from '../src/lib/server/schema';

dotenv.config({ path: './.env.local' });

export const client = postgres(process.env.SUPABASE_DB_URI!, { prepare: false });
export const db = drizzle(client, { schema });

// This will run migrations on the database, skipping the ones already applied
await migrate(db, { migrationsFolder: './drizzle/migrations' });

// Close the connection, otherwise the script will hang
await client.end();
