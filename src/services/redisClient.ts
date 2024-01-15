import { createClient } from 'redis';

const { env } = process;

if (!env.REDIS_URL) {
  throw new Error('No redis url provided');
}

let redisClient: ReturnType<typeof createClient> | undefined;

const getRedisClient = async () => {
  if (redisClient) {
    return redisClient;
  }

  redisClient = await createClient({ url: env.REDIS_URL })
    .on('error', (error) => {
      console.error('Redis Client Error', error);
    })
    .connect();

  return redisClient;
};

export { getRedisClient };
