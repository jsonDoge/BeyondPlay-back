# BeyondPlay back

Simple back-end using GraphQL stitching. Currently uses two ApolloServers one for remote GraphQL public API proxying and one for local <b>Logs</b> schema serving.

### ENV

Expected values:

- SERVER_PORT
- REDIS_URL
- USERNAME
- PASSWORD
- JWT_SECRET

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

Gateway proxy

```
/graphql

Supports:
  "query": "{ logs { userId, endpoint } }" - returns all logs (from redis)
  "query": "{ lastLog { userId, endpoint } }" - returns last log (from redis)
  {
    "query": "mutation Login($username: String!, $password: String!) { login(username: $username, password: $password) { token } } ",
	  "variables": {
		  "username": "<username here>",
		  "password": "<password here>"
	  }
  }
```

Gateway proxy - all queries to here requires authentication (proof of concept)

```
/graphql-gateway

Supports:
  "query": "{ countries { code name emoji } }" - returns country information from public GraphQL API "https://countries.trevorblades.com"
  "query": "{ allLifts { id name capacity status } }" - returns ski resort lift information from public GraphQL API https://snowtooth.moonhighway.com

  <!-- basic stitching query -->
  "query": "{ allLifts { id name capacity status } countries { code name emoji } }" - returns both lifts and countries
```

### TODO

- It should be possible to route local <b>Logs</b> schema resolvers through the existing gateway and avoid multiple graphql servers. So far no clear solution found.

### NOTES

- Latest apollo gateway server "doesn't like" APIs which don't support enhanced introspection and fails to return results. For older APIs to work we use an older version of @graphql-tools `transformSchemaFederation`. `transformSchemaFederation` - itself is buggy as it does not list all it's necessary dependencies. Manual installation of `"@apollo/federation": "0.20.6"` and `apollo-graphql` is required (even thought this project doesn't directly use them).
