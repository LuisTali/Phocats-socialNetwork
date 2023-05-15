import { useEffect, useState, useRef } from 'react'
import axios from 'axios';
import './App.css'

function App() {
  const [publi,setPublis] = useState([]);
  const baseUrl = 'http://localhost:5000/publication';

  const uploadPubli = (publication) =>{
    console.log(publication);
    let newPublis = [publication,...publi];
    setPublis(newPublis);
  }

  const useFetch = async() =>{
    console.log('useFetch');
    const publis = await axios.get(`${baseUrl}/`);
    console.log(publis.data.data);
    setPublis(publis.data.data);
  }

  useEffect(()=>{
    console.log(...publi)
    useFetch();
  },[])

  return (
    <>
    <Navbar/>
    <div className='homePage'>
      <div className='feed'>
      <MakePubli uploadPubli={uploadPubli}/>
      {publi ? publi.map((publi) => <Publication {...publi}/>) : <h2>'loading...'</h2>}
      </div>
      <div className='groupsDiv'>
        <ul>
          <li>pets</li>
          <li>gim</li>
          <li>landscaping</li>
        </ul>
      </div>
    </div>
    </>
  )
}

const Publication = ({id,textDescription,imgSrc,idUser}) =>{
  return <article className='publication' key={id}>
    <div className='profilePublication'>{idUser}</div>
    {textDescription}
    <img src={imgSrc}/>
  </article>
}

const Navbar = () =>{
  return <nav>
    <img src='./black-cat-logo.jpg'/>
    <div>
    <a>Home</a>
    <a>Notifications</a>
    <a>Friends</a>
    <a>MyProfile</a>
    </div>
  </nav>
}

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
      const response = await axios.post(`${baseUrl}/add`,{textDescription,file,imgName,idUser});
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
    console.log(file);
    let newPubli = {
      textDescription: description,
      file:file,
      imgName: file.name,
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


export default App
