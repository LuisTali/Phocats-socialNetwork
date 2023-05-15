import { getConnection, sql } from "../database/Connection.js";
import {querys} from '../database/querys.js';

export const getPublications = async(req,res) =>{
    try {
        const pool = await getConnection();
        const response = await pool.request().query(querys.getAllPublications);
        const data = response.recordset
        res.json({success:true,data})
    } catch (error) {
        res.status(404).json({success:false,error:error});
    }
}

export const newPublication = async(req,res) =>{
    try {

        upload(req,res);

        const {textDescription,file,imgName,idUser} = req.body;
        console.log('Body Request');
        console.log(req.body);
        const pool = await getConnection();
        const response = await pool.request().input("idUser",sql.Int,idUser).input("textDescription",sql.VarChar,textDescription).input("imgSrc",sql.VarChar,imgSrc).query(querys.newPublication);

        if(response.rowsAffected >= 1){
            const response2 = await pool.request().query(querys.getLastPublication); //Obtener la ultima publication insertada
            const publi = response2.recordset[0];
            console.log(publi);
            res.json({success:true,response,publication:publi});
        }
    } catch (error) {
        res.status(404).json({success:false,error:error});
    }
}