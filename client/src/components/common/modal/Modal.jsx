import React,{useEffect} from "react";
import './Modal.css';

const Modal = ({modalContent,setModalOpen,successModal}) =>{
    useEffect(()=>{
        setTimeout(()=>{
            setModalOpen(false);
        },3000)
    })

    return <div className={successModal ? 'successModal' : "failureModal"}>
        <h2>{modalContent}</h2>
    </div>
}

export default Modal;