import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import Modal from './Modal.jsx'
import axios from "axios";

const Login = ({setLogged}) => {
    const [user,setUser] = useState({username:'',password:''});
    const [isModalOpen,setModalOpen] = useState(false);
    const [modalContent,setModalContent] = useState('');
    const [succesModal,setSuccessModal] = useState(false);
    const baseUrl = 'http://localhost:5000/';
    const navigate = useNavigate();

    const handleChange = (e) =>{
        e.preventDefault();
        const name = e.target.name;
        const value = e.target.value;
        setUser({...user, [name]:value});
    }

    const handleSubmit = async(e) =>{
        e.preventDefault();
        if(!user.username || !user.password){
            setModalContent('Llene todos los campos');
            setModalOpen(true);
            return; 
        }
        let user2 = {username:user.username,password:user.password};
        const response = await axios.post(`${baseUrl}user/auth`,{...user2});
        if(!response.data.success){
            setModalContent('Error en la autenticacion, compruebe sus datos');
            setSuccessModal(false);
            setModalOpen(true);
            return;
        }
        user2 = response.data.user;
        localStorage.setItem('user',JSON.stringify(user2));
        setModalContent(`Bienvenido nuevamente ${user2.username}`);
            setSuccessModal(true);
            setModalOpen(true);
        setTimeout(()=>{
            setLogged(true);
            navigate('/')
        },3000);
    }

    return <div className="accountsForms">
        <form>
        <h2>Log In</h2>
            {user.username && <h2>{user.username}</h2>} 
            {user.password && <h2>{user.password}</h2>}
            
            <div className="inputGroup">
                <label>Username</label>
                <input type="text" name="username" onChange={(e)=>handleChange(e)}/>
            </div>
            <div className="inputGroup">
                <label>Password</label>
                <input type="password" name="password" onChange={(e)=>handleChange(e)}/>
            </div>
            <button className="btn" onClick={handleSubmit}>submit</button>
        </form>
        {isModalOpen && <Modal modalContent={modalContent} setModalOpen={setModalOpen} successModal={succesModal}/>}
        <label>Do not you have an account?</label>
        <Link to='/register'>Register</Link>
    </div>
}

export default Login;