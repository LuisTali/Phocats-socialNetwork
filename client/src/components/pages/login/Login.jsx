import React, { useState, useRef, useContext } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import VisibilityIcon from '@mui/icons-material/Visibility';
import ValidationUser from "../../common/validationUser/ValidationUser.jsx";
import './Login.css'

import Modal from '../../common/modal/Modal.jsx'
import { AppContext } from "../../../Index.jsx";
import { ModalContext } from "../../../context/modalContext/ModalContext.jsx";

const Login = () => {
    const {isModalOpen,setModalOpen,modalContent,setModalContent,succesModal,setSuccessModal} = useContext(ModalContext);
    const [user,setUser] = useState({username:'',password:''});
    const [idlogging,setIdLogging] = useState(0);
    const [showPass,setShowPass] = useState(false);
    const [showBtnValidation,setShowBtnValidation] = useState(false);
    const [showValidationUser,setShowValidationUser] = useState(false);
    const {setLogged,baseUrl} = React.useContext(AppContext);
    const refPass = useRef('');
    const navigate = useNavigate();

    const handleChange = (e) =>{
        e.preventDefault();
        const name = e.target.name;
        const value = e.target.value;
        setUser({...user, [name]:value});
    } 

    const handleValidateClick = async(e) =>{
        e.preventDefault();
        setShowValidationUser(true);
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
            if(response.data.msg == 'Valide su cuenta primero'){
                setIdLogging(response.data.userId);
                setShowBtnValidation(true);
            }
            setModalContent(response.data.msg);
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
    if(showValidationUser) return <ValidationUser idUser={idlogging} setShowValidationUser={setShowValidationUser}/>
    else return <div className="accountsForms">
        <form>
        <h2>Log In</h2>
            <div className="inputGroup">
                <label>Username</label>
                <input type="text" name="username" onChange={(e)=>handleChange(e)}/>
            </div>
            <div className="inputGroup">
                <label>Password</label>
                <div className="inputPassword">
                    <input type={showPass ? 'text' : 'password'} name="password" onChange={(e)=>handleChange(e)}/>
                    <VisibilityIcon onClick={()=>setShowPass(!showPass)}/>
                </div>
            </div>
            {!showBtnValidation && <button className="btn" onClick={handleSubmit}>submit</button>}
            {showBtnValidation && <button className="btn" onClick={(e)=>{handleValidateClick(e)}}>validate</button>}
        </form>
        {isModalOpen && <Modal modalContent={modalContent} setModalOpen={setModalOpen} successModal={succesModal}/>}
        <h3>Do not you have an account?</h3>
        <h3><Link to='/register'>Register</Link></h3>
    </div>
}

export default Login;