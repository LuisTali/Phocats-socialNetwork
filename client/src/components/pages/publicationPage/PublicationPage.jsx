import React, { useEffect, useState } from "react";
import {useParams, Link} from 'react-router-dom';
import ButtonBack from "../../common/buttonBack/ButtonBack.jsx";
import axios from "axios";
import './PublicationPage.css';

const PublicationPage = ({previousUrl}) =>{
    const {id} = useParams();
    const [publication,setPublication] = useState({});
    const baseUrl = 'http://localhost:5000/';

    const getPublication = async() =>{
        const response = await axios.get(`${baseUrl}publication/${id}`);
        if(response.data.success){
            setPublication(response.data.publication)
        }
    }
    useEffect(()=>{
        getPublication();
    },[id]);

    return <div className="publicationPage">
        <article className="publicationContent">
        <h1><Link to={`/user/${publication.idUser}`}>{publication.userCreator}</Link></h1>
        <img src={`http://localhost:5000/${publication.imgName}`}/>
        <h2>{publication.textDescription}</h2>
        <h3>{publication.madeIn}</h3>
        </article>
    </div>
}
export default PublicationPage;