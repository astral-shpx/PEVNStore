# PEVNStore

# Showcase

...

# Running with docker compose

```sh
docker compose up --build
```

## Clean up

```sh
docker-compose down
```

# Development

## Running the database

```sh
docker compose up my-postgres
```

## Running the backend

```sh
cd backend
npm run dev
```

## Running the frontend

```sh
cd frontend
npm run dev
```

# To seed the database

```sh
cd backend
npm run db:create # if it's not created already
npm run seed:run
```

# Tools

Database inspection: DBeaver

Api inspection: Insomnia

