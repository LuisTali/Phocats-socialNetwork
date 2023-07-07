import React, { useState, useEffect } from "react";
import { AppContext } from "../../../Index.jsx";
import axios from "axios";
import Modal from "../modal/Modal.jsx";
import './validationUser.css';

const ValidationUser = ({idUser}) =>{
    const [tokenToCheck,setTokenToCheck] = useState(null);
    const {baseUrl} = React.useContext(AppContext);
    const [isModalOpen,setModalOpen] = useState(false);
    const [modalContent,setModalContent] = useState('');
    const [succesModal,setSuccessModal] = useState(false);
    
    const generateToken = async() =>{
        const response = await axios.get(`${baseUrl}user/validateToken/${idUser}`);
        setTokenToCheck(response.data.token);
        console.log(response.data.token);
    }

    const handleChange = (e) =>{
        setTokenToCheck(e.target.value);
        console.log(tokenToCheck);
    }

    const handleValidate = async(e) =>{
        e.preventDefault();
        const response = await axios.post(`${baseUrl}user/checkToken`,{token:tokenToCheck});
        if(response.data.success){
            setModalContent(response.data.msg);
            setSuccessModal(true);
            setModalOpen(true);
            setTimeout(()=>{
                window.location.reload(true);
            },3000);
        }
        console.log(response);
    }
    
    useEffect(()=>{
        console.log('effecto');
        generateToken();
        setTimeout(()=>{
            window.location.reload(true);
        },180000);
    },[]);

    return <div className="accountsForms">
        <form>
        <h2>Validate your account</h2>
        <div className="inputGroup">
            <label>Token</label>
            <input type="text" name="username" onChange={(e)=>handleChange(e)}/>
        </div>
        <button className="btn" onClick={(e)=>handleValidate(e)}>validate</button>
        <h3>Check your invoice mail</h3>
        <label>After 3 minutes, your token wont be effective and you will be redirected to the login page</label>
        </form>
        {isModalOpen && <Modal modalContent={modalContent} setModalOpen={setModalOpen} successModal={succesModal}/>}
    </div>
}

export default ValidationUser;