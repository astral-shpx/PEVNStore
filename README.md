# PERNStore

# for running postgres in docker

`docker run --rm --name=my-postgres --env POSTGRES_PASSWORD=pass --detach --publish 5432:5432 postgres:16`

in /backend `npx sequelize-cli db:create`

# to seed database

`npx sequelize-cli db:seed:all`