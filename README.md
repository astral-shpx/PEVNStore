# PERNStore

# for running postgres in docker

in /backend `npx sequelize-cli db:create`

`docker run --rm --name=my-postgres --env POSTGRES_PASSWORD=pass --detach --publish 5432:5432 postgres:16`