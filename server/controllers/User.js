import {getConnection,sql} from '../database/Connection.js';
import { querys } from '../database/querys.js';

export const showUsers = async(req,res) =>{
    const pool = await getConnection();
    const result = await pool.request().query(querys.getAllUsers);
    
    if(!result.recordset[0]){
        res.json({success:false,msg:'There is not any accounts'});
    } 
        
    res.json({success:true,data:result.recordset});
}