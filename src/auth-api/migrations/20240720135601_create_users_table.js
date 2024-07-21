/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema
        .createTable('users', function (table) {
            table.increments('id').primary();
            table.string('username').notNullable();
            table.string('password').notNullable();
            table.enum('role', ['view', 'edit', 'admin']).defaultTo('view');
        })
        .then(() => {
            return knex.raw(`
          CREATE ROLE root WITH LOGIN PASSWORD 'root';
          ALTER ROLE root SUPERUSER;
  
          CREATE ROLE view_user WITH LOGIN PASSWORD 'view_password';
          CREATE ROLE edit_user WITH LOGIN PASSWORD 'edit_password';
          CREATE ROLE admin_user WITH LOGIN PASSWORD 'admin_password';
  
          GRANT CONNECT ON DATABASE sd TO view_user;
          GRANT USAGE ON SCHEMA public TO view_user;
          GRANT SELECT ON ALL TABLES IN SCHEMA public TO view_user;
  
          GRANT CONNECT ON DATABASE sd TO edit_user;
          GRANT USAGE ON SCHEMA public TO edit_user;
          GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO edit_user;
  
          GRANT CONNECT ON DATABASE sd TO admin_user;
          GRANT USAGE ON SCHEMA public TO admin_user;
          GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO admin_user;
          ALTER ROLE admin_user WITH CREATEROLE;
          ALTER ROLE admin_user WITH CREATEDB;
  
          ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO edit_user;
          ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO admin_user;
          ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT USAGE ON SEQUENCES TO edit_user;
          ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT USAGE ON SEQUENCES TO admin_user;
        `);
        });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema
        .dropTable('users')
        .then(() => {
            return knex.raw(`
          DROP ROLE IF EXISTS root;
          DROP ROLE IF EXISTS view_user;
          DROP ROLE IF EXISTS edit_user;
          DROP ROLE IF EXISTS admin_user;
        `);
        });
};