# PEVNStore

# Running with docker compose

```sh
docker compose up --build
```

# Development

## Running the database

```sh
docker compose up my-postgres
```

## Running backend

```sh
cd backend && npm run dev
```

## Running frontend

```sh
cd frontend && npm run dev
```

# To seed database

```sh
cd backend
npm run db:create # run if its not created already
npm run seed:run
```

# Tools

Database inspection: DBeaver

Api inspection: Insomnia

# Clean up

```sh
docker-compose down
```
