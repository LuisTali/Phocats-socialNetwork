import React, {useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import Modal from '../../common/modal/Modal.jsx';
import SearchInput from '../../common/searchInput/SearchInput.jsx'

import './Navbar.css'

const Navbar = ({username,setLogged,setUser,id}) =>{
    const navigate = useNavigate();
    const [isModalOpen,setModalOpen] = useState(false);
    const [modalContent,setModalContent] = useState('');
    const [succesModal,setSuccessModal] = useState(false);

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
    
    return <nav>
      <img src='./black-cat-logo.jpg'/>
      {isModalOpen && <Modal setModalOpen={setModalOpen} modalContent={modalContent}/>}
      <SearchInput setModalOpen={setModalOpen} setModalContent={setModalContent}/>
      <div>
        <Link to='/'>Home</Link>
        <a>Notifications</a>
        <a>Friends</a>
        {username && <Link to={`/user/${id}`}>My Profile</Link>}
        {username ? <Link onClick={(e)=>logOut(e)}>Log Out</Link> : <Link to='/login'>Log In</Link>}
      </div>
    </nav>
  }

  export default Navbar;