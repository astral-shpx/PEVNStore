# PERNStore

# running postgres in docker

`docker run --rm --name=my-postgres --env POSTGRES_PASSWORD=pass --detach --publish 5432:5432 postgres:16`

or `docker compose up my-postgres`

in /backend `npm run db:create` if no database exists

# to seed database

in /backend `npm run seed:run`

# Database inspection

The database inspection tool I use is DBeaver

# Docker compose

Run with `docker compose up`

Note: sometimes `docker system prune -a` or `docker-compose build --no-cache` might be needed