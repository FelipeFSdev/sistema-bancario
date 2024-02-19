require("dotenv").config();

const knex = require("knex")({
    client: "pg",
    connection: {
        user: process.env.DB_USER,
        database: process.env.DB_NAME,
        port: process.env.DB_PORT,
        host: process.env.DB_HOST,
        password: process.env.DB_PASS
    }
});

module.exports = knex;