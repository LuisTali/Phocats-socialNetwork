import {config} from 'dotenv';
config();

export default {
    port: process.env.PORT,
    database: process.env.DATABASE,
    username: process.env.USER,
    password: process.env.PASSWORD,
    dbport: process.env.DBPORT,
    serverName: process.env.SERVER_NAME
}