import React, { useEffect, useState } from "react";
import {useParams} from 'react-router-dom';
import Publication from "../../common/publication/Publication.jsx";
import axios from "axios";

const PublicationPage = () =>{
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

    return <div>
        <h1>{publication.userCreator}</h1>
        <h2>{publication.textDescription}</h2>
        <h3>{publication.madeIn}</h3>
        <img src={`http://localhost:5000/${publication.imgName}`}/>
    </div>
}
export default PublicationPage;