import React, { useContext, useState } from "react";
import {useNavigate} from 'react-router-dom'
import axios from "axios";
import './Register.css'
import Modal from "../../common/modal/Modal.jsx";
import { ModalContext } from "../../../context/modalContext/ModalContext";
import ShowPass from "../../common/showPass/ShowPass.jsx";
import { useShowPass } from "../../hooks/useShowPass.jsx";

const Register = () =>{
    const {isModalOpen,setModalOpen,modalContent,setModalContent,succesModal,setSuccessModal} = useContext(ModalContext);
    const {showPass,showPassword} = useShowPass();
    const [user,setUser] = useState({username:'',email:'',password:'',completeName:'',birthDate:''});
    const [passwordValidation,setPasswordValidation] = useState('');
    const baseUrl = 'http://localhost:5000/';
    const navigate = useNavigate();

    const handleChange = (e) =>{
        e.preventDefault();
        const name = e.target.name;
        const value = e.target.value;
        setUser({...user,[name]:value});
    }

    const handleSubmit = async(e) =>{
        e.preventDefault();
        setSuccessModal(false);
        if(!user.username || !user.password || !user.email || !user.completeName || !user.birthDate || !passwordValidation){
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
        if(new Date().getFullYear() - new Date(user.birthDate).getFullYear() < 18){
            setModalContent('Debes ser mayor de 18 para poder registrarte en Phocats');
            setModalOpen(true);
            return;
        }
        if(user.password != passwordValidation){
            setModalContent('Tus contraseñas no coinciden');
            setModalOpen(true);
            return;
        }

        //Formateo la fecha ingresada para pasarla al formato que posee SQL Server respecto a la variable Date
        let birthDateFormat = `${new Date(user.birthDate).getFullYear()}-${new Date(user.birthDate).getMonth() + 1}-${new Date(user.birthDate).getDate()+1}`;

        setUser({...user,['birthDate']:birthDateFormat}); //Actualizo birthDate con la fecha formateada
    
        const response = await axios.post(`${baseUrl}user/register`,{...user});

        if(!response.data.success){
            setModalContent(response.data.msg);
            setModalOpen(true);
            return;
        }
        setModalContent('Usuario registrado');
        setSuccessModal(true);
        setModalOpen(true);
        setTimeout(()=>{
            navigate('/');
        },3000);
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
            <div className="inputPassword">
                <input type={showPass ? 'text' : 'password'} name="password" onChange={(e)=>handleChange(e)}/>
                <ShowPass showPass={showPass} showPassword={showPassword}/>
            </div>
        </div>
        <div className="inputGroup">
            <label>Password Check</label>
            <div className="inputPassword">
                <input type={showPass ? 'text' : 'password'} name="passwordValidate" onChange={(e)=>setPasswordValidation(e.target.value)}/>
                <ShowPass showPass={showPass} showPassword={showPassword}/>
            </div>
        </div>
        <div className="inputGroup">
            <label>Complete Name</label>
            <input type="text" name="completeName" onChange={(e)=>handleChange(e)}/>
        </div>
        <div className="inputGroup">
            <label>Birth Date</label>
            <input type="date" name="birthDate" onChange={(e)=>handleChange(e)}/>
        </div>
        <button className="btn" onClick={handleSubmit}>submit</button>
        </form>
        {isModalOpen && <Modal modalContent={modalContent} setModalOpen={setModalOpen} successModal={succesModal}/>}
    </div>
}

export default Register;