import redis from 'redis';
import { promisify } from 'util';

const Redis = redis.createClient({ host: '127.0.0.1', port: 6379 });

Redis.on('error', err => {
  throw err;
});

export const getAsync = promisify(Redis.get).bind(Redis);
export const setAsync = promisify(Redis.set).bind(Redis);

export default Redis;
