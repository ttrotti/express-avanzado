import knex from 'knex';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config()

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;

export default connection;

/*
const options = {
    client: 'mysql',
    connection: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME
    }
}

const sqlite3Options = {
    client: 'sqlite3',
    connection: {
        filename: './mydb.sqlite'
    },
    useNullAsDefault: true
}

export const sqliteDB = knex(sqlite3Options)
export const db = knex(options)
*/

