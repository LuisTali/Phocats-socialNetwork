import React, { useEffect, useState } from "react";
import {useParams} from 'react-router-dom';
import Publication from "../../common/publication/Publication";
import axios from "axios";
import './PublicationsPerTag.css'

const PublicationsPerTag = () =>{
    const {nameTag} = useParams();
    const [publications,setPublications] = useState([]);
    const baseUrl = 'http://localhost:5000/';

    const getPublication = async() =>{
        const response = await axios.get(`${baseUrl}publication/publicationsByTag/${nameTag}`);
        console.log(response.data.publications);
        setPublications(response.data.publications)
    }

    useEffect(()=>{
            getPublication();
    },[nameTag]);

    return <div className="publicationsPerTag">
        {publications.map((publication) =>
            <Publication {...publication}/>
        )}
    </div>;
}
export default PublicationsPerTag;