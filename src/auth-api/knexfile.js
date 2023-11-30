module.exports = {
    db: {
        client: 'pg',
        connection: {
            host: 'auth-db',
            user: 'sd',
            password: 'sd',
            database: 'sd'
        },
        migrations: {
            tableName: 'knex_migrations',
            directory: './migrations'
        }
    }
};