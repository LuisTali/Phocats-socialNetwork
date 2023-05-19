import React, { useEffect, useState } from "react";
import {useParams} from 'react-router-dom';
import axios from 'axios';
import Publication from "../../common/publication/Publication";
import ModifyProfile from '../modifyProfile/ModifyProfile.jsx'
import './UserProfile.css'

const UserProfile = ({idUserLogged}) =>{
    const {id} = useParams();
    const [user,setUser] = useState({});
    const [publications,setPublications] = useState([]);
    let loggedUser = idUserLogged == id ? true : false; //Para setear si al cliquear mi foto puedo editar mi perfil o no
    const [showModifyProfile,setShowModifyProfile] = useState(false);
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
    },[id,showModifyProfile]);

    if(showModifyProfile){
        return <ModifyProfile user={user} setShowModifyProfile={setShowModifyProfile}/>
    }
    return <div className="userProfile" key={id}>
        {loggedUser ? <img title="Click para Editar" id="profilePic" src="/user-avatar.png" onClick={()=>setShowModifyProfile(true)}/> : <img id="profilePic" src="/user-avatar.png"/>}
        
        <h2>{user.username}</h2>
        <h3>{user.completeName}</h3>
        <h3>{user.userDescription ? user.userDescription : 'null'}</h3>
        <h3>{user.birthDate}</h3>
        {publications.map((publi) => <Publication {...publi} userCreator={user.username}/>)}
    </div>
}
export default UserProfile;