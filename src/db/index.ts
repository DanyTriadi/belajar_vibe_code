import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import * as schema from './schema';

const connectionString = process.env.DATABASE_URL || 'mysql://root:root@localhost:3306/belajar_vibe_code';

export const pool = mysql.createPool(connectionString);
export const db = drizzle(pool, { schema, mode: 'default' });
