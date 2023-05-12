import { useEffect, useState, useRef } from 'react'
import './App.css'

function App() {

  const [publi,setPublis] = useState([{
    id:1,
    text:'A curious cat looking for food',
    img:'./curious-cat.jpg',
    user: 'Luis Taliercio'
  },{
    id:2,
    text:'He looks cute but if you dont pay attention he will eat you',
    img:'./black-cat-tired.jpg',
    user: 'Emily Attias'
  },{
    id:3,
    text:'With my gimbros',
    img:'./gimbros.jpg',
    user: 'Santiago Blanco'
  },{
    id:4,
    text:'Sky I do love you',
    img:'./night-sky.jpg',
    user: 'Luis Taliercio'
  }])

  const uploadPubli = (publication) =>{
    console.log(publication);
    publication.id = publi.length + 1;
    let newPublis = [...publi,publication];
    setPublis(newPublis);
  }

  const useFetch = async() =>{
    console.log('useFetch');
    const response = await fetch('/api');
    const data = await response.json();
    console.log(data.msg);
  }

  useEffect(()=>{
    console.log(...publi)
    useFetch();
  },[publi])

  return (
    <>
    <Navbar/>
    <div className='homePage'>
      <div className='feed'>
      <MakePubli uploadPubli={uploadPubli}/>
      {publi.map((publi) => <Publication {...publi}/>)}
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

const Publication = ({id,text,img,user}) =>{
  return <article className='publication' key={id}>
    <div className='profilePublication'>{user}</div>
    {text}
    <img src={img}/>
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

  const handleUploadClick = () =>{
    if(!refFile.current.files[0] || !refDescription.current.value){
      alert('cargue archivo');
      return;
    }
    console.log(refDescription.current.value);
    setDescription(refDescription.current.value);
    
    if(refFile.current.files[0].type == 'image/jpeg' || refFile.current.files[0].type == 'image/jpg' || refFile.current.files[0].type == 'image/png'){
    setFile(refFile.current.files[0]);
    }
  }

  useEffect(()=>{
    if(!file){
        setFile(undefined);
        return;
    }

    const fileUrl = URL.createObjectURL(file);
    console.log(`./${file.name}`);

    let newPubli = {
      id:2,
      text: description,
      img: fileUrl,
      user: 'Luis Taliercio' //Modificarlo luego cuando cree User
    }
    uploadPubli(newPubli);

    setFile(undefined);
    setDescription('');
    refFile.current.value = '';
    refDescription.current.value = '';
  },[file]);


  return <div className='makePublication'>
    <input type='text' id='inputText' ref={refDescription}/>
    <ul className='multimediaOptions'>
      <li>
        <input id='fileInput' type='file' ref={refFile}/>
      </li>
    </ul>
    <button className='btn' onClick={handleUploadClick}>Send It</button>
  </div>
}


export default App
