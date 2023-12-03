import axios from 'axios';

const api = axios.create({ baseURL: 'http://localhost:3000' });

const testWithRedisClient = async () => {
  return api
    .get('redis-client')
    .then((res) => res.data as { ms: number })
    .catch(() => ({ ms: 0 }));
};

const testWithRedisLuascript = async () => {
  return api
    .get('redis-luascript')
    .then((res) => res.data as { ms: number })
    .catch(() => ({ ms: 0 }));
};

const calculateMs = async (loop: number, test: () => Promise<{ ms: number }>) => {
  let i = 0;

  const result = {
    min: Number.POSITIVE_INFINITY,
    max: Number.NEGATIVE_INFINITY,
    total: 0,
    avg: 0,
  };

  while (i < loop) {
    i += 1;

    const res = await test();

    result.total += res.ms;

    if (result.min > res.ms) {
      result.min = res.ms;
    }

    if (result.max < res.ms) {
      result.max = res.ms;
    }
  }

  result.avg = result.total / loop;

  return result;
};

const main = async () => {
  const loops = [1, 10, 100, 1000];

  for (const loop of loops) {
    console.log('client', await calculateMs(loop, testWithRedisClient));
    console.log('luascript', await calculateMs(loop, testWithRedisLuascript));
  }
};

main();
