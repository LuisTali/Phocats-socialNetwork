import React,{useEffect,useState,useRef} from 'react';
import axios from 'axios';
import './MakePublication.css'
import Modal from '../modal/Modal.jsx'

const MakePubli = ({uploadPubli, id, username,baseUrl}) =>{
    const[file,setFile] = useState();
    const[description,setDescription] = useState();
    const [isModalOpen,setModalOpen] = useState(false);
    const [modalContent,setModalContent] = useState('');
    const [succesModal,setSuccessModal] = useState(false);
    const refFile = useRef(null);
    const refDescription = useRef(null);
  
    const handleUploadClick = () =>{
      if(!refFile.current.files[0]){
        setModalContent('Cargue una imagen previamente');
        setModalOpen(true);
        return;
      }
      if(refDescription.current.value) setDescription(refDescription.current.value);
      if(refFile.current.files[0]) setFile(refFile.current.files[0]);
    }

    const uploadPublication = async() =>{
      try {
        if(file){
          console.log(file);
          const formData = new FormData();
          formData.append("file",file);
          formData.append("upload_preset","sdsftg7i")
          const res = await axios.post("https://api.cloudinary.com/v1_1/dvcmeanik/image/upload",formData);
          const response = await axios.post(`${baseUrl}publication/add`,{idUser:id,imgSrc:res.data.secure_url,textDescription:description});
          const data = await response.data.publication;
          return data;
        }
      } catch (error) {
        console.log(error);
      }

    }
  
    useEffect(()=>{
      if(!file){
          setFile(undefined);
          return;
      }

      uploadPublication().then((publi) => uploadPubli(publi));

      setFile(undefined);
      setDescription('');
      refFile.current.value = '';
      refDescription.current.value = '';
    },[file]);
  
    return <div className='makePublication' id='makePublicationDiv'>
      <input type='text' id='inputText' ref={refDescription} placeholder='Para añadir hashtags, coloquelos al final con un espacio entre tag y tag. Ej: This is my cat #cat #photo'/>
      <ul className='multimediaOptions'>
        <li>
          {username ? <input id='fileInput' type='file' accept="image/*" ref={refFile}/> : <input id='fileInput' type='file' accept="image/*" disabled ref={refFile}/>}
        </li>
      </ul>
      {username ? <button className='btn' onClick={handleUploadClick}>Send It</button> : <h2 style={{margin:'0 auto'}}>Inicia sesion para realizar publicaciones</h2>}
      {isModalOpen && <Modal setModalOpen={setModalOpen} modalContent={modalContent} successModal={succesModal}/>}
    </div>
  }

export default MakePubli;