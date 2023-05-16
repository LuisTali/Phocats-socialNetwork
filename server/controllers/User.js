import { query } from 'express';
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

export const registerUser = async(req,res) =>{
    const {username,password,email,completeName,age} = req.body;
    console.log(username,password,email,completeName,age);
    
    try {
        const pool = await getConnection();
        const response = await pool.request().input("email",sql.VarChar,email).input("username",sql.VarChar,username).input("password",sql.VarChar,password).input("completename",sql.VarChar,completeName).input("age",sql.Int,age).query(querys.insertNewUser);

        if(response.rowsAffected >= 1){
            const user = {
                username,password,email,completeName,age
            }
            res.status(200).json({success:true,user:user});
        }
    } catch (error) {
        console.log(error.message);
        res.status(200).json({success:false,error:error.message});
    }
}

export const authLogin = async(req,res) =>{
    const {username,password} = req.body;
    console.log(username,password);
    try {
        const pool = await getConnection();
        const response = await pool.request().input("username",sql.VarChar,username).input("password",sql.VarChar,password).query(querys.authenticateUser);
        
        if(response.recordset.length >= 1){
            console.log(response.recordset[0]);
            res.status(200).json({success:true,user:response.recordset[0]})
        }
    } catch (error) {
        res.status(200).json({success:false,error:error});
    }
}

