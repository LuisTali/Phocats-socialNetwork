import React, { useContext, useEffect, useState } from "react";
import {useParams, useNavigate} from 'react-router-dom';
import Publication from "../../common/publication/Publication";
import axios from "axios";
import ButtonBack from "../../common/buttonBack/ButtonBack";
import './PublicationsPerTag.css'
import { AppContext } from "../../../Index.jsx";
import { LocationContext } from "../../../context/locationContext/LocationContext";

const PublicationsPerTag = () =>{
    const {nameTag} = useParams();
    const [publications,setPublications] = useState([]);
    const {baseUrl} = React.useContext(AppContext);
    const {lastLocation,setLastLocation} = useContext(LocationContext);
    const navigate = useNavigate();

    const getPublication = async() =>{
        const response = await axios.get(`${baseUrl}publication/publicationsByTag/${nameTag}`);
        if(response.data.publications) setPublications(response.data.publications);
        else{
            navigate('/');
            window.location.reload(true);
        } 
    }

    useEffect(()=>{
            getPublication();
    },[nameTag]);

    return <div className="tagPage">
        <div className="publicationsPerTag">
            <ButtonBack previousUrl={lastLocation}/>
            {publications.map((publication) =>
                <Publication {...publication}/>
            )}
        </div>
    </div>;
}
export default PublicationsPerTag;