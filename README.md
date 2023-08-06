# Instructions

### Backend

## Prerequisite

You need to Docker and docker-compose in order to run the postgres container, Once you have Docker install simply go to `backend` directory and run

```
docker-compose up -d
```

Above command will run the container.

After the container up and running, run the following commands

```
npm i -g sequelize-cli
npx sequelize-cli db:create
npx sequelize-cli db:migrate
```

Above commands will create a database in postgres and run the migration to create required tables.

1. Move to `backend` directory using `cd backend`.
2. Install required Dependencies

```
yarn
```

3. Create a build and start the production server

```
yarn build
yarn start
```

4. Backend will run on Port 3000

### Client

1. Move to `client` directory using `cd client`.
2. Install required Dependencies

```
yarn
```

3. Create a build and start the production server

```
yarn build
yarn start
```

4. Client will run on Port 8080
