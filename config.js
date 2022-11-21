const packageJson = require("./package.json");

require('dotenv').config();

const { env } = process;


module.exports = {

    /**
     * Port where the API is going to run
     */
    port: env.PORT || 3000,

    hostname: env.HOSTNAME || "localhost",

    baseUrl: env.BASE_URL || "/api/v1",

    version: packageJson.version,

    pg: {
        username: env.POSTGRES_USERNAME,
        password: env.POSTGRES_PASSWORD,
        hostname: env.POSTGRES_HOSTNAME,
        port: env.POSTGRES_PORT,
        database: env.POSTGRES_DATABASE,
    }

}