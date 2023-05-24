import { getConnection,sql } from "../database/Connection.js";
import {querys} from '../database/querys.js';

export const getTop3MostUsedTags = async(req,res) =>{
    try {
        const pool = await getConnection();
        const response = await pool.request().query(querys.getTop3MostUsedTags);
        res.status(200).json({success:true,tags:response.recordset})
    } catch (error) {
        res.status(404).json({success:false,error:error});
    }
}