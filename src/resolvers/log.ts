import { getRedisClient } from '../services/redisClient';

export const logsResolver = {
  Query: {
    logs: async () => {
      const redisClient = await getRedisClient();

      const stringLogs = await redisClient.lRange('logs', 0, -1);
      return stringLogs.map((l) => JSON.parse(l));
    },
    lastLog: async () => {
      const redisClient = await getRedisClient();

      const logsLength = await redisClient.lLen('logs');
      const stringLastLog = await redisClient.lIndex('logs', logsLength - 1);
      return stringLastLog ? JSON.parse(stringLastLog) : null;
    },
  },
};
