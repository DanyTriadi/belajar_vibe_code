import { Elysia, t } from 'elysia';
import { createUser } from '../services/users-services';

export const usersRoutes = new Elysia()
  .post(
    '/api/users',
    async ({ body, set }) => {
      const { username, email, password } = body;
      const result = await createUser({ username, email, password });
      
      set.status = 201;
      return {
        message: 'User berhasil dibuat',
        data: result,
      };
    },
    {
      body: t.Object({
        username: t.String(),
        email: t.String(),
        password: t.String(),
      }),
    }
  );
