import { query, response } from 'express';
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
        }else{
            res.status(200).json({success:false,msg:'No hubo coincidencias, compruebe sus datos'});
        }
    } catch (error) {
        res.status(200).json({success:false,error:error});
    }
}

//Usada por el cliente al realizar una peticion para obtener como respuesta la info del usuario
export const getUserById = async(req,res) =>{
    const {id} = req.params;
    console.log(id);
    try {
        const pool = await getConnection();
        const response = await pool.request().input("id",sql.Int,id).query(querys.getUserById);
        res.status(200).json({success:true,user:response.recordset[0]});
    } catch (error) {
        res.status(200).json({success:false,error});
    }
}

export const getByUsername = async(req,res) =>{
    const {username} = req.body;
    try {
        console.log('Username');
        console.log(username);
        const pool = await getConnection();
        const response = await pool.request().input("username",sql.VarChar,username).query(querys.getUserByUsername);
        console.log(response);
        if(response.recordset.length > 0){
            res.status(200).json({success:true,user:response.recordset[0]});
        }else{
            res.status(200).json({success:false,msg:'No users with that username'});
        }
    } catch (error) {
        res.status(200).json({success:false,error});
    }
}

//Usada por otros controladores del lado servidor
export const getById = async(id)=>{
    try {
        const pool = await getConnection();
        const response = await pool.request().input("id",sql.Int,id).query(querys.getUserById);
        return response.recordset[0];
    } catch (error) {
        return null;
    }
}


