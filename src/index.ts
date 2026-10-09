import { Elysia } from 'elysia';
import { routes } from './routes';

const port = Number(process.env.PORT) || 3000;

const app = new Elysia()
  .get('/', () => ({ message: 'Welcome to ElysiaJS + Drizzle + MySQL API' }))
  .use(routes)
  .listen(port);

console.log(`🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`);
