import { getConnection, sql } from "../database/Connection.js";
import {getById} from './User.js'
import {querys} from '../database/querys.js';
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

export const newPublication = async(req,res) =>{
    try {
        console.log(req.encryptedName); //Llega desde la funcion storage en el router Publication
        const {textDescription,idUser} = req.body;
        const pool = await getConnection();
        const response = await pool.request().input("idUser",sql.Int,idUser).input("textDescription",sql.VarChar,textDescription).input("imgSrc",sql.VarChar,req.encryptedName).query(querys.newPublication);
        if(response.rowsAffected >= 1){

            const responseLastPublication = await pool.request().query(querys.getLastPublication); //Obtener la ultima publication insertada
            const publi = responseLastPublication.recordset[0];

            handleTagsOfPublication(publi.id,textDescription);

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

export const getPublicationsByNameTag = async(req,res) =>{
    const {tag} = req.params;
    try {
        const pool = await getConnection();
        const response = await pool.request().input("nameTag",sql.VarChar,tag).query(querys.getPublicationsByNameTag);
        if(response.rowsAffected[0] > 0){
            for(const publi of response.recordset){ //Para cada publicacion averiguo su Usuario creador
                let userCreator = await getById(publi.idUser);
                let formatedDate = formatDate(publi.madeIn)
                publi.madeIn = formatedDate;
                publi.userCreator = userCreator.username; //Se lo añado antes de enviarle la respuesta al cliente
            }
            res.status(200).json({success:true,publications:response.recordset});
        }else{
            res.status(200).json({success:false});
        }
        
    } catch (error) {
        res.status(200).json({success:false,error:error});
    }
}

export const getPublicationById = async(req,res) =>{
    const {id} = req.params;
    try {
        const pool = await getConnection();
        const response = await pool.request().input("id",sql.Int,id).query(querys.getPublicationById);
        let publi = response.recordset[0]
        if(response.rowsAffected[0] > 0){
            let formatedDate = formatDate(publi.madeIn)
            publi.madeIn = formatedDate;
            let userCreator = await getById(publi.idUser); //Obtengo el username del usuario creador
            publi.userCreator = userCreator.username;
            res.status(200).json({success:true,publication:publi});
        }else{
            res.status(200).json({success:false});
        }
    } catch (error) {
        res.status(200).json({success:false,error:error});
    }
}

export const getPublicationsFromFollowedUsers = async(req,res) =>{
    const {id} = req.params;
    try {
        const pool = await getConnection();
        const response = await pool.request().input("idUser",sql.Int,id).query(querys.makeFeed);
        for(const publi of response.recordset){
            let formatedDate = formatDate(publi.madeIn)
            publi.madeIn = formatedDate;
        }
        res.json({success:true,data:response.recordset});
    } catch (error) {
        res.status(200).json({success:false,error:error});
    }
}

export const editPublication = async(req,res)=>{
    const {id,textDescription} = req.body;
    try {
        const pool = await getConnection();
        const response = await pool.request().input("id",sql.Int,id).input("textDescription",sql.VarChar,textDescription).query(querys.editPublication);
        handleTagsOfPublication(id,textDescription);
        res.status(200).json({success:true,response})
    } catch (error) {
        res.status(200).json({success:false,error:error});
    }
}

export const deletePublication = async(req,res) =>{
    const {id} = req.params;
    const {textDescription} = req.body;
    try {
        const pool = await getConnection();
        if(getArrayTags(textDescription)){
            const response = await pool.request().input("id",sql.Int,id).query(querys.deletePxT);
            console.log(response);
        }
        const response2 = await pool.request().input("id",sql.Int,id).query(querys.deletePublication);
        console.log(response2);
        res.status(200).json({success:true,response:id});
    } catch (error) {
        res.status(200).json({success:false,error:error.message});
    }
}

//Metodos que utiliza el server

const getArrayTags = (textDescription) =>{
    let index = textDescription.indexOf('#'); 
        let tags = [];
        let arr = [];
        let temporaryArray = [];
        if (index >= 0){ //Si se encuentra la posicion de # hay tags.
            arr = textDescription.split(' '); //Creo un arreglo cortanto los espacios entre cada tag
            for(const tag of arr){
                if(tag[0] == '#'){
                    //Si ultimo caracter del tag no es ni numero ni letra lo elimino y pusheo el tag asi
                    if(isNaN(tag[tag.length-1]) && (!(tag[tag.length-1].toUpperCase().charCodeAt(0) > 64 && tag[tag.length-1].toUpperCase().charCodeAt(0) < 91))){
                            temporaryArray.push(tag.slice(0,tag.length-1));
                    }else{
                        temporaryArray.push(tag);
                    } 
                } 
            }
        }else return;

        //Por cada tag, corto desde la posicion 1, omitiendo el # en la posicion 0
        tags = temporaryArray.map((tag) => tag.slice(1));
        //Omito los tags vacios si es que el usuario ingresa "# "
        tags = tags.filter((tag) => tag != '');
        //Quito los tags repetidos si el usuario ingresa #cat #cat
        let lastTags = tags.filter((value,index) => tags.indexOf(value) === index);
        return lastTags;
}

const handleTagsOfPublication = async(idPubli,textDescription) =>{
    try {
        const pool = await getConnection();

        let tags = getArrayTags(textDescription); 
            for(const tag of tags){
                
                const responseTagExist = await pool.request().input("tag",sql.VarChar,tag).query(querys.checkExistsTag);

                if(responseTagExist.rowsAffected[0] == 0){
                    await pool.request().input("tag",sql.VarChar,tag).query(querys.newTag);
                    const responseIdTag = await pool.request().input("nameTag",sql.VarChar,tag).query(querys.getIdTagByName);

                    await pool.request().input("idPublication",sql.Int,idPubli).input("idTag",sql.Int,responseIdTag.recordset[0].id).query(querys.addTagPerPublication);
                }else{
                    await pool.request().input("idPublication",sql.Int,idPubli).input("idTag",sql.Int,responseTagExist.recordset[0].id).query(querys.addTagPerPublication);
                }
            }
            //Si no hay tags == undefined
    } catch (error) {
        return error;
    }
    
}