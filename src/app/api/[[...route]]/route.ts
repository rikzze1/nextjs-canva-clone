import { Hono } from 'hono';
import { handle } from 'hono/vercel';
import { AuthConfig, initAuthConfig } from '@hono/auth-js';
import authConfig from '@/auth.config';

import images from './images';
import test from './test';
import ai from './ai';
import users from './users';
import projects from './projects';
import subscriptions from './subscriptions';

export const runtime = 'nodejs';

function getAuthConfig(): AuthConfig {
  return {
    secret: process.env.AUTH_SECRET!,
    ...authConfig,
  };
}

const app = new Hono().basePath('/api');

app.use('*', initAuthConfig(getAuthConfig));

const routes = app
  .route('/ai', ai)
  .route('/test', test)
  .route('/users', users)
  .route('/images', images)
  .route('/projects', projects)
  .route('/subscriptions', subscriptions);

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);

export type AppType = typeof routes;
