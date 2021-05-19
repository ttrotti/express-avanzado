import knex from 'knex';
import dotenv from 'dotenv';
dotenv.config()

const options = {
    client: 'mysql',
    connection: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME
    }
}

const db = knex(options)

export default db