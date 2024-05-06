# PERNStore

# Running postgres in docker

`docker compose up my-postgres`

# To seed database

in /backend `npm run db:create` if no database exists (TODO: fix not working on prod)

in /backend `npm run seed:run`

# Tools

Database inspection: DBeaver

Api inspection: Insomnia

# Docker compose

Run with `docker compose up --build`

Note: sometimes `docker system prune -a` or `docker-compose build --no-cache` might be needed

# Recommended for development

run frontend and backend with npm run dev and not with docker compose; use docker compose for postgres

# Production

Database: 
`docker compose -p pernstore-prod -f docker-compose.prod.yml up my-postgres-prod --build`

Full:
`docker-compose -p pernstore-prod -f docker-compose.prod.yml up --build`

... k8s

# Clean up

```sh
docker-compose -p pernstore down
docker-compose -p pernstore-prod down
```

