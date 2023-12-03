import axios from 'axios';

const api = axios.create({ baseURL: 'http://localhost:3000' });

const testAllWithRedisClient = async () => {
  return api
    .get('redis-client')
    .then((res) => res.data as { ms: number })
    .catch(() => ({ ms: 0 }));
};

const testAllWithRedisLuascript = async () => {
  return api
    .get('redis-luascript')
    .then((res) => res.data as { ms: number })
    .catch(() => ({ ms: 0 }));
};

const calculateAvgMsByTestAll = async (loop: number, test: () => Promise<{ ms: number }>) => {
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

    if (result.min > res.ms) {
      result.min = res.ms;
    }

    if (result.max < res.ms) {
      result.max = res.ms;
    }

    result.total += res.ms;
  }

  result.avg = result.total / loop;

  return result;
};

const main = async () => {
  console.log('client', await calculateAvgMsByTestAll(1, testAllWithRedisClient));
  console.log('luascript', await calculateAvgMsByTestAll(1, testAllWithRedisLuascript));

  console.log('client', await calculateAvgMsByTestAll(10, testAllWithRedisClient));
  console.log('luascript', await calculateAvgMsByTestAll(10, testAllWithRedisLuascript));

  console.log('client', await calculateAvgMsByTestAll(100, testAllWithRedisClient));
  console.log('luascript', await calculateAvgMsByTestAll(100, testAllWithRedisLuascript));

  console.log('client', await calculateAvgMsByTestAll(1000, testAllWithRedisClient));
  console.log('luascript', await calculateAvgMsByTestAll(1000, testAllWithRedisLuascript));
};

main();
