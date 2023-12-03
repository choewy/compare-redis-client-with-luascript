# Compare Redis Client With Redis Luascript

## Libs

- NestJS
- IoRedis

## APIs

### Redis Client Module

- GET /redis-client : test all
- GET /redis-client/:key : test by key

### Redis Luascript Module

- GET /redis-luascript : test all
- GET /redis-luascript/:key : test by key

```ts
export enum TestKey {
  Coord = 'coord',
  Weather = 'weather',
  Stations = 'stations',
  Sys = 'sys',
  Main = 'main',
}
```

## Analysis

- Redis : v7.2(Docker)
- MacOS : CPU(M2), RAM(16GB)

### Redis Client

| loop |   min |   max |   total |      avg |
| ---: | ----: | ----: | ------: | -------: |
|    1 | 10 ms | 10 ms |   10 ms |    10 ms |
|   10 |  3 ms | 11 ms |   59 ms |   5.9 ms |
|  100 |  2 ms |  7 ms |  271 ms |  2.71 ms |
| 1000 |  2 ms | 38 ms | 2741 ms | 2.741 ms |

### Redis Luascript

| loop |  min |  max |   total |      avg |
| ---: | ---: | ---: | ------: | -------: |
|    1 | 5 ms | 5 ms |    5 ms |     5 ms |
|   10 | 1 ms | 4 ms |   23 ms |   2.3 ms |
|  100 | 1 ms | 7 ms |  173 ms |  1.73 ms |
| 1000 | 1 ms | 9 ms | 2127 ms | 2.127 ms |
