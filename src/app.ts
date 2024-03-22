import 'reflect-metadata';
import 'express-async-errors';
import express, { Express, Request, Response } from 'express';
import cors from 'cors';

import { connectDb, disconnectDB /*connectRedis, disconnectRedis*/ } from './config';

import { handleApplicationErrors } from './middlewares';
import {
  usersRouter,
  authenticationRouter,
  eventsRouter,
  enrollmentsRouter,
  ticketsRouter,
  paymentsRouter,
  hotelsRouter,
  bookingRouter,
  activitiesRouter,
} from './routers';

const app = express();
app
  .use(cors())
  .use(express.json())
  .get('/health', (_req: Request, res: Response) => res.send('OK!'))
  .use('/users', usersRouter)
  .use('/auth', authenticationRouter)
  .use('/event', eventsRouter)
  .use('/enrollments', enrollmentsRouter)
  .use('/tickets', ticketsRouter)
  .use('/payments', paymentsRouter)
  .use('/hotels', hotelsRouter)
  .use('/booking', bookingRouter)
  .use('/activities', activitiesRouter)
  .use(handleApplicationErrors);

export function init(): Promise<Express> {
  connectDb();
  //connectRedis();
  return Promise.resolve(app);
}

export async function close(): Promise<void> {
  await disconnectDB();
  //await disconnectRedis();
}

export default app;
