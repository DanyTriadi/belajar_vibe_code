import { Elysia, t } from 'elysia';
import { db } from '../db';
import { users } from '../db/schema';
import { eq } from 'drizzle-orm';

export const routes = new Elysia()
  .get('/users', async () => {
    const allUsers = await db.select().from(users);
    return { success: true, data: allUsers };
  })
  .get('/users/:id', async ({ params: { id }, set }) => {
    const userId = Number(id);
    if (isNaN(userId)) {
      set.status = 400;
      return { success: false, error: 'Invalid user ID' };
    }
    const result = await db.select().from(users).where(eq(users.id, userId));
    if (result.length === 0) {
      set.status = 404;
      return { success: false, error: 'User not found' };
    }
    return { success: true, data: result[0] };
  })
  .post(
    '/users',
    async ({ body, set }) => {
      const { name, email } = body;
      const [result] = await db.insert(users).values({ name, email });
      set.status = 201;
      return {
        success: true,
        message: 'User created successfully',
        data: { id: result.insertId, name, email },
      };
    },
    {
      body: t.Object({
        name: t.String(),
        email: t.String(),
      }),
    }
  )
  .put(
    '/users/:id',
    async ({ params: { id }, body, set }) => {
      const userId = Number(id);
      if (isNaN(userId)) {
        set.status = 400;
        return { success: false, error: 'Invalid user ID' };
      }
      const { name, email } = body;
      await db.update(users).set({ name, email }).where(eq(users.id, userId));
      return { success: true, message: 'User updated successfully' };
    },
    {
      body: t.Object({
        name: t.String(),
        email: t.String(),
      }),
    }
  )
  .delete('/users/:id', async ({ params: { id }, set }) => {
    const userId = Number(id);
    if (isNaN(userId)) {
      set.status = 400;
      return { success: false, error: 'Invalid user ID' };
    }
    await db.delete(users).where(eq(users.id, userId));
    return { success: true, message: 'User deleted successfully' };
  });
