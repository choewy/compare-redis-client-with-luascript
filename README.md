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
