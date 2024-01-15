# BeyondPlay back

Simple back-end using GraphQL stitching.

### ENV

Expected values:

- SERVER_PORT
- REDIS_URL

### Run

Docker compose (with Redis):

Will start and serve the application at the default port of 8080, together with Redis.

```
docker compose up
```

Development server (without Redis):

```bash
yarn install

yarn run dev
```

Tests (with mocked Redis):

```bash
yarn install

yarn test
```

### Endpoints

Default port :8080

`/health - returns 200 'Ok' and adds a log entry into redis`

```
/graphql

Supports:
  "query": "{ logs { userId, endpoint } }" - returns all logs (from redis)
  "query": "{ lastLog { userId, endpoint } }" - returns last log (from redis)
```
