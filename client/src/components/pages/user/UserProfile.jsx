import React, { useEffect, useState } from "react";
import {useParams} from 'react-router-dom';
import axios from 'axios';
import Publication from "../../common/publication/Publication";
import './UserProfile.css'

const UserProfile = () =>{
    const {id} = useParams();
    const [user,setUser] = useState({});
    const [publications,setPublications] = useState([]);
    const baseUrl = 'http://localhost:5000/'

    const getById = async() =>{
        const response = await axios.get(`${baseUrl}user/id/${id}`);
        if(response.data.success){
            setUser(response.data.user);
        }
        return ;
    }
    const getPublicationsByUserId = async() =>{
        const response = await axios.get(`${baseUrl}publication/publicationsByUser/${id}`);
        if(response.data.success){
            setPublications(response.data.publications);
        }
    }

    useEffect(()=>{
        if(id){
            getById();
            getPublicationsByUserId();
        }
    },[id]);

    return <div className="userProfile" key={id}>
        <h2>{user.username}</h2>
        <h3>{user.completeName}</h3>
        {publications.map((publi) => <Publication {...publi} userCreator={user.username}/>)}
    </div>
}
export default UserProfile;