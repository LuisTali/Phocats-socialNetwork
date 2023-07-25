import react, {useContext} from 'react';
import {Outlet} from 'react-router-dom';
import Navbar from './navbar/Navbar.jsx';
import Footer from './footer/Footer.jsx';
import { ModalContext } from '../../context/modalContext/ModalContext.jsx';
import { AppContext } from '../../Index.jsx';
import { LocationContext } from '../../context/locationContext/LocationContext.jsx';
import { UploadContext } from '../../context/uploadContext/UploadContext.jsx';

const Layout = ({}) =>{
    const {username,setLogged,setUser,id,notifications,newFollowers,baseUrl,setForceRender,forceRender} = useContext(AppContext);
    const {isModalOpen,setModalOpen,modalContent,setModalContent,succesModal,setSuccessModal} = useContext(ModalContext);
    const {lastLocation} = useContext(LocationContext);
    const {uploadOpen,setUploadOpen} = useContext(UploadContext);

    return <>
        <Navbar isModalOpen={isModalOpen} setModalOpen={setModalOpen} modalContent={modalContent }setModalContent={setModalContent} succesModal={succesModal} setSuccessModal={setSuccessModal}username={username} setLogged={setLogged} setUser={setUser} id={id}notifications={notifications}newFollowers={newFollowers}/>
        <Outlet/>
        <Footer lastLocation={lastLocation} uploadOpen={uploadOpen} setUploadOpen={setUploadOpen}/>
    </>
}

export default Layout;