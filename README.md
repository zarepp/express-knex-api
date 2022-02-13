# iada-api

How to run development:

1. Migrate database

    ```
    NODE_ENV=development npx knex migrate:latest
    ```

2. Run

    ```
    npm run dev
    ```

How to run on staging environment


## Notes

Drop all tables in public schema to clean the database so that, we can run migration again.

```sql
DROP SCHEMA public CASCADE;
CREATE SCHEMA public;
-- for postgresql 9.3 or greater
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO public;
```
# express-knex-api
