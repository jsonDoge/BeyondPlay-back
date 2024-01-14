import { Request, Response, Router } from 'express';

const healthRouter = Router();

healthRouter.get('/health', async function (
  req: Request,
  res: Response,
) {
  return res.status(200).send('Ok');
});

export { healthRouter };