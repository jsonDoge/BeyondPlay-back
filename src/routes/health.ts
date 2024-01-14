import { Request, Response, Router } from 'express';

import { getRedisClient } from '../services/redisClient';

const healthRouter = Router();

healthRouter.get('/health', async function (
  req: Request,
  res: Response,
) {
  // TODO: temporary logging for proof of work
  const redisClient = await getRedisClient();

  await redisClient.lPush('logs', JSON.stringify({ userId: '1', endpoint: '/health' }));

  return res.status(200).send('Ok');
});

export { healthRouter };