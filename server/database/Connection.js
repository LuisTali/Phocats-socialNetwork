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
//`Server=${config.serverName},${config.dbport0};Database=${config.database};User Id=${config.username};Password=${config.password};Encrypt=false`

const getConnection = async() =>{
    try {
        console.log(config.username);
        const pool = await sql.connect(dbSetting);
        return pool;
    } catch (error) {
        console.log(error);
    }
}

export {sql,getConnection};