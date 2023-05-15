import { useEffect, useState, useRef } from 'react'

import MakePubli from './MakePublication.jsx';
import Publication from './Publication.jsx';
import axios from 'axios';

function Home() {
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
    console.log(...publi)
    useFetch();
  },[empty])

  return (
    <>
    <div className='homePage'>
      <div className='feed'>
      <MakePubli uploadPubli={uploadPubli}/>
      {!empty && publi.map((publi) => <Publication {...publi} id={publi.id}/>)}
      {empty && <h2>Looks quite over here</h2>}
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
