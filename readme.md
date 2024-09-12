# SETUP

1. install all libs

   ```
   npm install
   ```

2. copy env_example to .env

   ```
   cp .env.example .env
   ```

3. make sure your database is READY!

4. run migration & seeder

5. run app

   ```
   npm run start
   ```

# MIGRATION TABLE

1. create new migration file

   ```
   npx sequelize-cli migration:generate --name create-user-table
   ```

2. run migration

   ```
   npx sequelize-cli db:migrate --env development
   ```

3. rollback migration

   ```
   npx sequelize-cli db:migrate:undo:all --env development
   ```

# SEEDER TABLE

1. create new seeder file

   ```
   npx sequelize-cli seed:generate --name user-seeder
   ```

2. run seeder

   ```
   npx sequelize-cli db:seed:all

   // OR

   npx sequelize-cli db:seed --seed 20240817102423-user-seeder.js
   ```
