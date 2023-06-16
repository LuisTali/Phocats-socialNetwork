import React, {createContext, useState} from 'react';

export const ModalContext = createContext();

const ModalContextProvider = ({children}) =>{
    const [isModalOpen,setModalOpen] = useState(false);
    const [modalContent,setModalContent] = useState('');
    const [succesModal,setSuccessModal] = useState(false);

    const data = {
        isModalOpen,
        setModalOpen,
        modalContent,
        setModalContent,
        succesModal,
        setSuccessModal
    }

    return <ModalContext.Provider value={data}>{children}</ModalContext.Provider>
}

export default ModalContextProvider;
