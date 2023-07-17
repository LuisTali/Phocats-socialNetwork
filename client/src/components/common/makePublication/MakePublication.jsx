import React,{useEffect,useState,useRef} from 'react';
import axios from 'axios';
import './MakePublication.css'
import Modal from '../modal/Modal.jsx';
import UploadIcon from '@mui/icons-material/Upload';

const MakePubli = ({uploadPubli, id, username,baseUrl,setUploadOpen,uploadOpen,forceRender,setForceRender}) =>{
    const[file,setFile] = useState();
    const [urlPreview,setUrlPreview] = useState(null)
    const[description,setDescription] = useState();
    const [isModalOpen,setModalOpen] = useState(false);
    const [modalContent,setModalContent] = useState('');
    const [succesModal,setSuccessModal] = useState(false);
    const refFile = useRef(null);
    const refDescription = useRef(null);
  
    const handleChange = (e) =>{
      if(e.target.type == 'file'){
        if(refFile.current.files[0]){
          setFile(e.target.files[0]);
          const objectURL = URL.createObjectURL(e.target.files[0]);
          setUrlPreview(objectURL);
        } 
      }else{
        setDescription(refDescription.current.value)
      }
    }

    const handleUploadClick = () =>{
      if(file){
        uploadPublication();
        setFile(undefined);
        setUrlPreview(null);
        setDescription('');
        refFile.current.value = '';
        refDescription.current.value = '';
        setUploadOpen(false);
        let newForceRender = forceRender + 1;
        setForceRender(newForceRender);
        setTimeout(()=>window.location.reload(true),2000);
      }else{
        setModalContent('Select an image first');
        setModalOpen(true);
      }
      
    }

    const uploadPublication = async() =>{
      try {
        if(file){
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
  
    return <div className={uploadOpen ? 'makePublication show' : 'makePublication'} id='makePublicationDiv'>
      <button className='backBtnMobile' onClick={()=>setUploadOpen(false)}>X</button>
      <input type='text' id='inputText' ref={refDescription} onChange={(e)=>handleChange(e)}  placeholder='To write hashtags, use the # before the word and then do a blank space'/>
      <div className='multimediaOptions'>
          <div className='inputFileDiv'>
            <UploadIcon/>
            {username ? <input id='fileInput' type='file' accept="image/*" onChange={(e)=>handleChange(e)} ref={refFile}/> : <input id='fileInput' type='file' accept="image/*" disabled ref={refFile}/>}
          </div>
          {urlPreview && <button className='removeFile' onClick={()=>{setFile(null);setUrlPreview(null);}}>Discard</button>}
      </div>
      <div className='previewImg'>
        {urlPreview && <img src={urlPreview}/>}
      </div>
      {username ? <button className='btn' onClick={handleUploadClick}>Upload</button> : <h2 style={{margin:'0 auto'}}>Inicia sesion para realizar publicaciones</h2>}
      {isModalOpen && <Modal setModalOpen={setModalOpen} modalContent={modalContent} successModal={succesModal}/>}
    </div>
  }

export default MakePubli;