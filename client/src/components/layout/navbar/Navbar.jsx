import React, {useEffect, useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import Modal from '../../common/modal/Modal.jsx';
import SearchInput from '../../common/searchInput/SearchInput.jsx';
import Notifications from "../../common/notifications/Notifications.jsx";

import './Navbar.css'

const Navbar = ({username,setLogged,setUser,id,notifications,newFollowers}) =>{
    const navigate = useNavigate();
    const [isModalOpen,setModalOpen] = useState(false);
    const [modalContent,setModalContent] = useState('');
    const [succesModal,setSuccessModal] = useState(false);
    const [isNotificacionsOpen,setNotificacionsOpen] = useState(false);
    const [areNewFollowers,setNewFollowers] = useState(undefined);

    const logOut = (e) =>{
      e.preventDefault(); 
      setUser({});
      localStorage.clear();
      setLogged(false);
      navigate('/');
      setModalOpen(true);
      setSuccessModal(true);
      setModalContent('Log Out exitoso');
    }

    const handleNotificationsClick = (e) =>{
      e.preventDefault();
      setNotificacionsOpen(!isNotificacionsOpen);
    }

    const checkNotNotified = () =>{
      let flag = false;
      for(const notification of notifications){
        if(!notification.notificated){
          flag=true;
          break;
        }
        if(flag) break;
      }
      setNewFollowers(flag);
    }  
    
    return <nav>
      <img src='./black-cat-logo.jpg'/>
      {isModalOpen && <Modal setModalOpen={setModalOpen} modalContent={modalContent}/>}
      <SearchInput setModalOpen={setModalOpen} setModalContent={setModalContent}/>
      <div>
        <Link to='/'>Home</Link>
        <a>Friends</a>
        {username && <Link to={`/user/${id}`}>MyProfile</Link>}
        {username && <a onClick={(e)=>handleNotificationsClick(e)}>Notifications {areNewFollowers && <label id="newFollowers"/>} </a>}
        {username ? <Link onClick={(e)=>logOut(e)}>Log Out</Link> : <Link to='/login'>Log In</Link>}
      </div>
      {username && <Notifications isNotificacionsOpen={isNotificacionsOpen} notifications={notifications} idAccount={id} checkNotNotified={checkNotNotified}/>}
    </nav>
  }

  export default Navbar;