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
    const baseUrl = 'http://localhost:5000/';
    const [following,setFollowing] = useState(false);

    window.addEventListener(onclick,(e)=>{
        const clickOut = e.target.closest('#userPageId');
        if(clickOut) return;
        else setShowModifyProfile(false);   
    })

    const getById = async() =>{
        const response = await axios.get(`${baseUrl}user/id/${id}`);
        if(response.data.success){
            setUser(response.data.user);
        }
        return ;
    }

    const getPublicationsByUserId = async() =>{ //Obtiene las publicaciones del usuario deseado
        const response = await axios.get(`${baseUrl}publication/publicationsByUser/${id}`);
        if(response.data.success){
            setPublications(response.data.publications);
        }
    }

    //Si lo sigue y cliqueo el boton follow lo dejo de seguir, caso contrario lo empiezo a seguir
    const handleFollow = async() =>{ 
        if(!following){
            const response = await axios.post(`${baseUrl}user/follow`,{idFollower:idUserLogged,idFollowing:id});
            if(response.data.success){
                setFollowing(!following);
            }
        }else{
            const response = await axios.post(`${baseUrl}user/unfollow`,{idFollower:idUserLogged,idFollowing:id});
            if(response.data.success){
                setFollowing(!following);
            }
        }
    }

    //Chequea si sigo o no al usuario buscado
    const checkFollow = async() =>{
        const response = await axios.post(`${baseUrl}user/checkFollow`,{idFollower:idUserLogged,idFollowing:id});
        setFollowing(response.data.following);
    }

    useEffect(()=>{
        if(id){
            getById();
            getPublicationsByUserId();
            if(!loggedUser){ 
                //Si el usuario encontrado, no es el mismo que esta logueado ejecuta checkFollow para pasar la info al boton Follow
                checkFollow();
            }
        }
    },[id,showModifyProfile,following]);

    if(showModifyProfile){
        return <ModifyProfile user={user} setShowModifyProfile={setShowModifyProfile}/>
    }
    return <div id="userPageId" className="userProfile" key={id}>
        {loggedUser ? <img title="Click para Editar" id="profilePic" src="/user-avatar.png" onClick={()=>setShowModifyProfile(true)}/> : <img id="profilePic" src="/user-avatar.png"/>}
        {!loggedUser && <button className="followBtn" onClick={handleFollow}>{following ? 'Unfollow' : 'Follow'}</button>}
        <h2>{user.username}</h2>
        <h3>{user.completeName}</h3>
        <h3>{user.userDescription ? user.userDescription : 'No hubo tiempo de reflexion'}</h3>
        <h3>{user.birthDate}</h3>
        {publications.map((publi) => <Publication {...publi} userCreator={user.username}/>)}
    </div>
}
export default UserProfile;