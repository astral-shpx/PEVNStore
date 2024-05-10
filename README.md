# PEVNStore

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

# Clean up

```sh
docker-compose -p pernstore down
docker-compose -p pernstore-prod down
```

# Deploymjent to gke

Database: 
`docker compose -f docker-compose.prod.yml up my-postgres-prod --build`

Full:
`docker-compose -f docker-compose.prod.yml up --build`

```sh
gcloud config set project pevnstore
gcloud auth configure-docker europe-west2-docker.pkg.dev
gcloud artifacts repositories create repo --repository-format=docker --location=europe-west2 --description="Docker repository"
# tag
docker tag pevnstore-backend europe-west2-docker.pkg.dev/pevnstore/repo/pevnstore-backend
docker tag pevnstore-frontend europe-west2-docker.pkg.dev/pevnstore/repo/pevnstore-frontend
docker tag postgres:16 europe-west2-docker.pkg.dev/pevnstore/repo/postgres:16
# push
docker push europe-west2-docker.pkg.dev/pevnstore/repo/pevnstore-backend
docker push europe-west2-docker.pkg.dev/pevnstore/repo/pevnstore-frontend
docker push europe-west2-docker.pkg.dev/pevnstore/repo/postgres:16

gcloud container clusters get-credentials cluster --zone europe-west2
kubectl apply -k ./k8s/

... k8s

```