import React, {useContext, useEffect, useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import Modal from '../../common/modal/Modal.jsx';
import SearchInput from '../../common/searchInput/SearchInput.jsx';
import Notifications from "../../common/notifications/Notifications.jsx";
import './Navbar.css'

const Navbar = ({isModalOpen,setModalOpen,modalContent,setModalContent,succesModal,setSuccessModal,username,setLogged,setUser,id,notifications,newFollowers}) =>{

    const navigate = useNavigate();
    const [isNotificacionsOpen,setNotificacionsOpen] = useState(false);
    const [areNewFollowers,setNewFollowers] = useState(undefined);

    const [clicked,setClicked] = useState(false); //Cliquee la navbar en responsive design o aun no

    const logOut = (e) =>{
      e.preventDefault(); 
      setClicked(clicked && false);
      setModalOpen(true);
      setSuccessModal(true);
      setModalContent('Log Out successful');
      setTimeout(()=>{
        setUser({});
        localStorage.clear();
        setLogged(false);
        navigate('/');
      },3000)
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

    const handleClick = () =>{
      if(isNotificacionsOpen){
        setNotificacionsOpen(false);
        setClicked(!clicked);
      }else setClicked(!clicked);
    }

    if(username){
      return <nav>
      <Link to='/' id="imageLogo"><img src={'/black-cat-logo.jpg'}/></Link>
      {isModalOpen && <Modal setModalOpen={setModalOpen} modalContent={modalContent}/>}
      <SearchInput setModalOpen={setModalOpen} setModalContent={setModalContent}/>
      <div id={username ? 'links' : 'linksNotLogged'} className={clicked ? '' : 'inactive'}>
        <Link onClick={handleClick} to='/'>Home</Link>
        <Link onClick={handleClick} to='/friends'>Friends</Link>
        <Link onClick={handleClick} to={`/user/${id}`}>MyProfile</Link>
        <a onClick={(e)=>handleNotificationsClick(e)}>
          Notifications {areNewFollowers && <label id="newFollowers"/>} 
        </a>
        <Link onClick={(e)=>logOut(e)}>Log Out</Link>
      </div>
      <Notifications isNotificacionsOpen={isNotificacionsOpen} setNotificacionsOpen={setNotificacionsOpen} setClicked={setClicked} notifications={notifications} idAccount={id} checkNotNotified={checkNotNotified}/>

      <div id="mobile">
        <i onClick={()=>handleClick()} className={clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
      </div>

    </nav>
    }else{
      return <nav className="unloggedNavbar">
          <Link to='/' onClick={()=>{
            navigate('/')
            window.location.reload(true);
          }} id="imageLogo"><img src={'/black-cat-logo.jpg'}/></Link>
          <Link to='/' onClick={()=>{
            navigate('/');
            window.location.reload(true)
          }}>Log In</Link>
      </nav>
    }
  }

  export default Navbar;