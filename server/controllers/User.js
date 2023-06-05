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
    const {username,password,email,completeName,birthDate} = req.body;
    try {
        if(esCorreoElectronico(email)){
            const pool = await getConnection();
            const response = await pool.request().input("email",sql.VarChar,email).input("username",sql.VarChar,username).input("password",sql.VarChar,password).input("completename",sql.VarChar,completeName).input("birthdate",sql.Date,birthDate).query(querys.insertNewUser);
            if(response.rowsAffected >= 1){
                res.status(200).json({success:true});
            }
        }else{
            res.status(200).json({success:false,msg:'Formato email invalido'});
        }
    } catch (error) {
        if(error.message == "Violation of UNIQUE KEY constraint 'uqUsers2'. Cannot insert duplicate key in object 'dbo.Users'. The duplicate key value is (luisTali)."){
            res.status(200).json({success:false,msg:'Ya hay un usuario con ese Username, modifiquelo'});
        }else if(error.message == "Violation of UNIQUE KEY constraint 'uqUsers1'. Cannot insert duplicate key in object 'dbo.Users'. The duplicate key value is (luis@gmail.com)."){
            res.status(200).json({success:false,msg:'Ese mail ya esta asociado a una cuenta, ingrese uno nuevo'});
        }else res.status(200).json({success:false,msg:error.message});
    }
}

export const authLogin = async(req,res) =>{
    const {username,password} = req.body;
    
    try {
        const pool = await getConnection();
        const response = await pool.request().input("username",sql.VarChar,username).input("password",sql.VarChar,password).query(querys.authenticateUser);
        
        if(response.recordset.length >= 1){
            let user = response.recordset[0];
            const responseNotis = await pool.request().input("idUser",sql.Int,user.id).query(querys.makeNotificacionsForUser); //Obtengo los nuevos seguidores y los paso como notificaciones
            const notifications= responseNotis.recordset;
            user.notifications = notifications;

            let flag = false;
            for(const noti of notifications){ //Por cada notificacion chequeo si hay alguna nueva
                if(noti.notificated == false){
                    flag=true; //Si hay una sin notificar modifico estado a true
                    break;
                } 
                if(flag) break;
            }
            user.newFollowers = flag; //Seteo la prop del user al valor de la flag, si hay nuevos follows == true
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
    try {
        const pool = await getConnection();
        const response = await pool.request().input("id",sql.Int,id).query(querys.getUserById);
        
        //Paso la fecha a la funcion formatDate y la formatea
        response.recordset[0].birthDate = formatDate(response.recordset[0].birthDate);
        res.status(200).json({success:true,user:response.recordset[0]});
    } catch (error) {
        res.status(200).json({success:false,error});
    }
}

export const getByUsername = async(req,res) =>{
    const {username} = req.body;
    try {
        const pool = await getConnection();
        const response = await pool.request().input("username",sql.VarChar,username).query(querys.getUserByUsername);
        if(response.recordset.length > 0){
            res.status(200).json({success:true,user:response.recordset[0]});
        }else{
            res.status(200).json({success:false,msg:'No users with that username'});
        }
    } catch (error) {
        res.status(200).json({success:false,error});
    }
}

export const followAccount = async(req,res) =>{
    const {idFollower,idFollowing} = req.body;
    try {
        const pool = await getConnection();
        const response = await pool.request().input("idFollower",sql.Int,idFollower).input("idFollowing",sql.Int,idFollowing).query(querys.followAccount);
        if(response.rowsAffected.length > 0){
            res.status(200).json({success:true,msg:'Usuario seguido'});
        }else{
            res.status(200).json({success:true,msg:'Ya seguias a este usuario'});
        }
    } catch (error) {
        res.status(200).json({success:false,error:error.originalError.info.message});
    }
}

export const unfollowAccount = async(req,res) =>{
    const {idFollower,idFollowing} = req.body;
    try {
        const pool = await getConnection();
        const response = await pool.request().input("idFollower",sql.Int,idFollower).input("idFollowing",sql.Int,idFollowing).query(querys.unfollowAccount);
        if(response.rowsAffected[0] == 1){
            res.status(200).json({success:true,msg:'Usuario dejado de seguir'});
        }else{
            res.status(200).json({success:true,msg:'No seguias a este usuario'});
        }
    } catch (error) {
        res.status(200).json({success:false,error:error.originalError.info.message});
    }
}

export const checkFollow = async(req,res) =>{
    const {idFollower,idFollowing} = req.body;
    try {
        const pool = await getConnection();
        const response = await pool.request().input("idFollower",sql.Int,idFollower).input("idFollowing",sql.Int,idFollowing).query(querys.checkFollow);
        if(response.recordset.length > 0){ //Si hubo coincidencias
            if(response.recordset[0].id === Number(idFollowing)){ //Chequeo nuevamente que el id retornado sea igual al del usuario seguido por seguridad
                res.status(200).json({success:true,following:true});
            }
        }else{ //No hubo coincidencias, por lo tanto no se siguen
            res.status(200).json({success:true,following:false})
        }
    } catch (error) {
        res.status(200).json({success:false,error});
    }
}

export const updateNotificatedStatus = async(req,res) =>{
    const {idAccount, idFollower} = req.body;
    try {
        const pool = await getConnection();
        const response = await pool.request().input("idAccount",sql.Int,idAccount).input("idFollower",sql.Int,idFollower).query(querys.updateNotifiedFollow);
        if(response.rowsAffected[0] === 1){
            res.status(200).json({success:true,notificated:true});
        }
    } catch (error) {
        res.status(200).json({success:false,error});
    }
}

export const poblateFriendsPage = async(req,res) =>{
    const {id} = req.params;
    try {
        const pool = await getConnection();
        const friendsResponse = await pool.request().input("idUser",sql.VarChar,id).query(querys.getFriends); 
        const followersResponse = await pool.request().input("idUser",sql.VarChar,id).query(querys.getFollowers); 
        const followingResponse = await pool.request().input("idUser",sql.VarChar,id).query(querys.getFollowing); 
        res.status(200).json({success:true,friends:friendsResponse.recordset,followers:followersResponse.recordset,following:followingResponse.recordset});
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

export const formatDate = (date) =>{
    let birthDate = new Date(date);
    let birthYear = birthDate.getFullYear();
    let birthMonth = '' + (birthDate.getMonth()+1);
    if(birthMonth.length < 2) birthMonth = `0${birthMonth}`;
    let birthDay = '' + (birthDate.getDate()+1);
    if(birthDay.length<2) birthDay = `0${birthDay}`;
    birthDate = birthYear + '-' + birthMonth + '-' + birthDay ;
    return birthDate;
}

const esCorreoElectronico = correoElectronico => /\S+@\S+/.test(correoElectronico);


