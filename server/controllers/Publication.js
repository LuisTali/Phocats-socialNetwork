import { log } from "console";
import { getConnection, sql } from "../database/Connection.js";
import {getById} from './User.js'
import {querys} from '../database/querys.js';
import path from 'path';
import { query } from "express";
import { formatDate } from "./User.js";

export const getPublications = async(req,res) =>{
    try {
        const pool = await getConnection();
        const response = await pool.request().query(querys.getAllPublications);
        let data = response.recordset;
        for(const publi of data){ //Para cada publicacion averiguo su Usuario creador
            let userCreator = await getById(publi.idUser);
            let formatedDate = formatDate(publi.madeIn)
            publi.madeIn = formatedDate;
            publi.userCreator = userCreator.username; //Se lo añado antes de enviarle la respuesta al cliente
        }
        res.json({success:true,data})
    } catch (error) {
        res.status(404).json({success:false,error:error});
    }
}

export const newPublicationTryingTags = async(req,res) =>{
    try {
        let {textDescription,imgName,idUser} = req.body;
        let tags = getArrayTags(textDescription);
        console.log(tags);
        ((tags === undefined) ? tags = 'vacio' : tags = tags);
        res.status(200).json({success:true,tags})
    } catch (error) {
        
    }
}

export const newPublication = async(req,res) =>{
    try {
        console.log(req.encryptedName); //Llega desde la funcion storage en el router Publication
        const {textDescription,imgName,idUser} = req.body;
        const pool = await getConnection();
        const response = await pool.request().input("idUser",sql.Int,idUser).input("textDescription",sql.VarChar,textDescription).input("imgSrc",sql.VarChar,req.encryptedName).query(querys.newPublication);
        
        if(response.rowsAffected >= 1){
            
            const response2 = await pool.request().query(querys.getLastPublication); //Obtener la ultima publication insertada

            //Finalizar, añadiendo tags a sus respectivas tablas
            let tags = getArrayTags(textDescription); 
            //Si no hay tags == undefined
            console.log(tags);

            const publi = response2.recordset[0];
            let userCreator = await getById(publi.idUser); //Obtengo el username del usuario creador
            publi.userCreator = userCreator.username; //Se lo añado antes de enviarle la respuesta al cliente
            let formatedDate = formatDate(publi.madeIn)
            publi.madeIn = formatedDate;
            publi.userCreator = userCreator.username; //Se lo añado antes de enviarle la respuesta al cliente
            res.status(200).json({success:true,response,publication:publi});
        }
    } catch (error) {
        res.status(200).json({success:false,error:error});
    }
}

export const getPublicationsByIdUser = async(req,res) =>{
    const {id} = req.params;
    try {
        const pool = await getConnection();
        const response = await pool.request().input("idUser",sql.Int,id).query(querys.getPublicationsByIdUser);
        const publications = response.recordset;
        for(const publi of publications){
            let formatedDate = formatDate(publi.madeIn)
            publi.madeIn = formatedDate;
        }
        res.status(200).json({success:true,publications});
    } catch (error) {
        res.status(200).json({success:false,error:error});
    }
}


//Metodos que utiliza el server

const getArrayTags = (textDescription) =>{
    let index = textDescription.indexOf('#'); 
        let tags = [];
        let arr = [];
        if (index > 0){ //Si se encuentra la posicion de # hay tags.
            textDescription = textDescription.slice(index); //Se extrae desde el primer # hasta el final
            arr = textDescription.split(' '); //Creo un arreglo cortanto los espacios entre cada tag
        }else return;

        for(const tag of arr){
            //Por cada tag, corto desde la posicion 1, omitiendo el # en la posicion 0
            tags = arr.map((tag) => tag.slice(1)) 
        }
        console.log(tags); //Log de los tags
        return tags;
}