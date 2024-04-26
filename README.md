# PERNStore

# running postgres in docker

`docker run --rm --name=my-postgres --env POSTGRES_PASSWORD=pass --detach --publish 5432:5432 postgres:16`

in /backend `npm run db:create`

# to seed database

in /backend `npm run seed:run`

# Database inspection

The database inspection tool I use is DBeaver