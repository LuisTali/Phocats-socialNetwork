import { useEffect, useState, useRef } from 'react'
import axios from 'axios';
import './Home.css'

import MakePubli from '../../common/makePublication/MakePublication.jsx';
import Publication from '../../common/publication/Publication.jsx';

function Home({username,id}) {
  const [publi,setPublis] = useState([]);
  const [empty,setEmpty] = useState(true);
  const baseUrl = 'http://localhost:5000/publication';

  const uploadPubli = (publication) =>{
    let newPublis = [publication,...publi];
    setPublis(newPublis);
    setEmpty(false);
  }

  const useFetch = async() =>{
    const publis = await axios.get(`${baseUrl}/`);
    if(publis.data.data.length > 0){
      setPublis(publis.data.data);
      setEmpty(false);
    } 
  }

  useEffect(()=>{
    useFetch();
  },[empty])

  return (
    <>
    <div className='homePage'>
      <div className='feed'>
      <MakePubli uploadPubli={uploadPubli} id={id} username={username}/>
      {publi.map((publication) => <Publication {...publication} id={publication.id} userCreator={publication.userCreator}/>)}
      {empty && <h2 style={{marginTop:'2rem'}}>Looks quite over here</h2>}
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

export default Home;
