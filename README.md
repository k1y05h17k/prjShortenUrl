

## Commands to use in the Docker

### To Run Postgres in the Docker and references version to use

flags
- -p :: port
- -e :: environments variables
- -v :: specific volume
- -d :: run in second plan
- -t :: timer

```sh
docker run -p 5432:5432 -e POSTGRES_PASSWORD=1234 -v C:\Users\C0MPU74D0R\Documents\dev\docker:/var/lib/postgresql/data -d postgres

```

### To list all containers exists

```sh
docker ps
```

### To stop specific container send your ID

```sh
docker stop -t 0 IDcontainer
```

### To remove all stopped containers

```sh
docker container prune
```

## Commands to use whit file docker compose

In the terminal visual studio

```terminal
docker-compose up -d
```
