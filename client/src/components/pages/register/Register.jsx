import React, { useState } from "react";
import {useNavigate} from 'react-router-dom'
import axios from "axios";
import './Register.css'
import Modal from "../../common/modal/Modal.jsx";

const Register = () =>{
    const [user,setUser] = useState({username:'',email:'',password:'',completeName:'',age:0});
    const [isModalOpen,setModalOpen] = useState(false);
    const [modalContent,setModalContent] = useState('');
    const [succesModal,setSuccessModal] = useState(false);
    const baseUrl = 'http://localhost:5000/';
    const navigate = useNavigate();

    const handleChange = (e) =>{
        e.preventDefault();
        const name = e.target.name;
        const value = e.target.value;
        setUser({...user,[name]:value});
        console.log(user);
    }

    const handleSubmit = async(e) =>{
        e.preventDefault();
        if(!user.username || !user.password || !user.email || !user.completeName || !user.age){
            setModalContent('Llene todos los campos');
            setModalOpen(true);
            return; 
        }
        if(user.username.length < 8){
            setModalContent('Username debe tener al menos 8 caracteres');
            setModalOpen(true);
            return;
        }
        if(user.password.length < 8){
            setModalContent('Password debe tener al menos 8 caracteres');
            setModalOpen(true);
            return;
        }
        if(user.age < 18){
            setModalContent('Debes ser mayor de 18 para poder registrarte en Phocats');
            setModalOpen(true);
            return;
        }
        
        const response = await axios.post(`${baseUrl}user/register`,{...user});
        console.log(response.data);
        if(!response.data.success){
            setModalContent(response.data.error);
            setSuccessModal(false);
            setModalOpen(true);
            return;
        }
        setModalContent('Usuario registrado');
        setSuccessModal(true);
        setModalOpen(true);
        setTimeout(()=>{
            navigate('/login');
        },3000)
    }

    return <div className="accountsForms">
        <form>
        <h2>Register</h2>
        <div className="inputGroup">
            <label>Username</label>
            <input type="text" name="username" onChange={(e)=>handleChange(e)}/>
        </div>
        <div className="inputGroup">
            <label>Email</label>
            <input type="text" name="email" onChange={(e)=>handleChange(e)}/>
        </div>
        <div className="inputGroup">
            <label>Password</label>
            <input type="password" name="password" onChange={(e)=>handleChange(e)}/>
        </div>
        <div className="inputGroup">
            <label>Complete Name</label>
            <input type="text" name="completeName" onChange={(e)=>handleChange(e)}/>
        </div>
        <div className="inputGroup">
            <label>Age</label>
            <input type="number" name="age" onChange={(e)=>handleChange(e)}/>
        </div>
        <button className="btn" onClick={handleSubmit}>submit</button>
        </form>
        {isModalOpen && <Modal modalContent={modalContent} setModalOpen={setModalOpen} successModal={succesModal}/>}
    </div>
}

export default Register;