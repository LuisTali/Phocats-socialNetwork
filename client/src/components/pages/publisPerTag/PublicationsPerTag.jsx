import React, { useEffect, useState } from "react";
import {useParams} from 'react-router-dom';
import Publication from "../../common/publication/Publication";
import axios from "axios";
import ButtonBack from "../../common/buttonBack/ButtonBack";
import './PublicationsPerTag.css'
import { AppContext } from "../../../Index.jsx";

const PublicationsPerTag = () =>{
    const {nameTag} = useParams();
    const [publications,setPublications] = useState([]);
    const {baseUrl,lastLocation} = React.useContext(AppContext);

    const getPublication = async() =>{
        const response = await axios.get(`${baseUrl}publication/publicationsByTag/${nameTag}`);
        setPublications(response.data.publications)
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