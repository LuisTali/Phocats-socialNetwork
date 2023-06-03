import sql from 'mssql';
import config from '../config.js';

const dbSetting = {
    user: config.username,
    password: config.password,
    server: config.serverName,
    database: config.database,
    port: Number(config.dbport),
    options:{
        trustServerCertificate: true 
    }
}

const getConnection = async() =>{
    try {
        const pool = await sql.connect(dbSetting);
        return pool;
    } catch (error) {
        console.log(error);
    }
}

export {sql,getConnection};