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

1. Check data. Check migrations & seeds data.

    ```console
    $ ssh iadapekan_staging 'docker exec -t <container_name> npx knex migrate:list'
    $ ssh iadapekan_staging 'docker exec -t api_iadapekan_com npx knex migrate:list'
    $ ssh iadapekan_staging 'docker exec -t api_iadapekan_com npx knex migrate:latest'
    $ ssh iadapekan_staging 'docker exec -t api_iadapekan_com npx knex migrate:rollback'
    ```

2. Run. Use github action deployment. Read more -> https://docs.iadapekan.com/docs/system/deployment-manual


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
