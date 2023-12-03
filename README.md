# Compare Redis Client With Redis Luascript

## Libs

- NestJS
- IoRedis

## Test Data Keys

```ts
enum TestDataKey {
  Coord = 'coord',
  Weather = 'weather',
  Stations = 'stations',
  Sys = 'sys',
  Main = 'main',
}
```

## APIs

### Redis Client Module

- GET /redis-client : test all
- GET /redis-client/:key : test by key

### Redis Luascript Module

- GET /redis-luascript : test all
- GET /redis-luascript/:key : test by key

## Analysis(AVG ms)

| loop | client(min) | client(max) | client(total) | client(avg) | luascript(min) | luascript(max) | luascript(total) | luascript(avg) |
| ---: | ----------: | ----------: | ------------: | ----------: | -------------: | -------------: | ---------------: | -------------: |
|    1 |       10 ms |       10 ms |         10 ms |       10 ms |           5 ms |            5ms |              5ms |            5ms |
|   10 |        3 ms |       11 ms |         59 ms |      5.9 ms |           1 ms |           4 ms |            23 ms |         2.3 ms |
|  100 |        2 ms |        7 ms |        271 ms |     2.71 ms |           1 ms |           7 ms |           173 ms |        1.73 ms |
| 1000 |        2 ms |       38 ms |       2741 ms |    2.741 ms |           1 ms |           9 ms |          2127 ms |       2.127 ms |
