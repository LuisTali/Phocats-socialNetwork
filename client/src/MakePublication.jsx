import React,{useEffect,useState,useRef} from 'react';
import axios from 'axios';

const MakePubli = ({uploadPubli}) =>{
    const[file,setFile] = useState();
    const[description,setDescription] = useState();
    const refFile = useRef(null);
    const refDescription = useRef(null);
    const baseUrl = 'http://localhost:5000/publication';
  
    const handleUploadClick = () =>{
      if(!refFile.current.files[0] || !refDescription.current.value){
        alert('cargue archivo');
        return;
      }
      setDescription(refDescription.current.value);
      setFile(refFile.current.files[0]);
    }
  
    const uploadPublication = async({textDescription,file,imgName,idUser}) => { 
      try {
        console.log(textDescription);
        console.log(file);
        console.log(imgName);
        console.log(idUser);
        const formData = new FormData();
        formData.append('img',file);
        formData.append('textDescription',textDescription);
        formData.append('imgName',imgName);
        formData.append('idUser',idUser);
        const config = {
          headers: {
              'content-type': 'multipart/form-data'
          }
        };
        const response = await axios.post(`${baseUrl}/add`,formData,config);
        const data = await response.data.publication
        return data;
        } catch (error) {
          console.log(error);
        }
    }
  
    useEffect(()=>{
      if(!file){
          setFile(undefined);
          return;
      }
      const fileUrl = URL.createObjectURL(file); //Si paso esto visualizo la imagen al subirla
  
      //Cada publi tiene un array de tags, para esto crear un nuevo input, luego puedo filtrar publicaciones en base a los tags que estas publis poseen utilizando por ejemplo include
      let newPubli = {
        textDescription: description,
        imgName: file.name,
        file:file,
        idUser: 3 //Modificarlo luego cuando cree User
      }
      
      uploadPublication({...newPubli}).then((publi) => uploadPubli(publi));
  
      setFile(undefined);
      setDescription('');
      refFile.current.value = '';
      refDescription.current.value = '';
    },[file]);
  
    return <div className='makePublication'>
      <input type='text' id='inputText' ref={refDescription}/>
      <ul className='multimediaOptions'>
        <li>
          <input id='fileInput' type='file' accept="image/*" ref={refFile}/>
        </li>
      </ul>
      <button className='btn' onClick={handleUploadClick}>Send It</button>
    </div>
  }

export default MakePubli;