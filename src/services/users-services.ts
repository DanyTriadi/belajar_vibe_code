import { db } from '../db';
import { users } from '../db/schema';
import type { NewUser } from '../db/schema';

export const createUser = async (data: NewUser) => {
  const [result] = await db.insert(users).values(data);
  const insertId = result.insertId;

  return {
    id: insertId,
    username: data.username,
    email: data.email,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
};
