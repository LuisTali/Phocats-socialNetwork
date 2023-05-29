import { useEffect, useState, useRef } from 'react'
import axios from 'axios';
import './Home.css'

import MakePubli from '../../common/makePublication/MakePublication.jsx';
import Publication from '../../common/publication/Publication.jsx';
import Tag from '../../common/tag/Tag.jsx';
import Footer from '../../layout/footer/Footer';

function Home({username,id}) {
  const [publi,setPublis] = useState([]); //publications in the feed
  const [tags,setTags] = useState([]); //top3 most used tags
  const [empty,setEmpty] = useState(true); 
  const baseUrl = 'http://localhost:5000/';

  const uploadPubli = (publication) =>{
    let newPublis = [publication,...publi];
    setPublis(newPublis);
    setEmpty(false);
  }

  const useFetch = async() =>{
    if(id){
      const publis = await axios.get(`${baseUrl}publication/feed/${id}`);
      if(publis.data.data.length > 0){
        setPublis(publis.data.data);
        setEmpty(false);
      } 
    }
  }

  const getMostUsedTags = async() =>{
    const responseTags = await axios.get(`${baseUrl}tag/top3`);
    console.log(responseTags.data.tags);
    setTags(responseTags.data.tags);
  }

  useEffect(()=>{
    useFetch();
    getMostUsedTags();
  },[empty,id])

  return (
    <>
    <div className='homePage' style={publi.length <= 1 ? {height:'100vh'} : {height:'100%'}}>
      <div className='feed'>
      <MakePubli uploadPubli={uploadPubli} id={id} username={username}/>

      <hr id="lineaMoviles"/>

      {publi.map((publication) => <Publication {...publication}/>)}
      {empty && <h2 style={{marginTop:'2rem'}}>Looks quite over here</h2>}
      </div>
      <div className='groupsDiv'>
        <h3 style={{fontWeight:'500'}}>Top 3 Most Used Tags</h3>
        <ul>
          {tags.map((tag) => <Tag {...tag}/>)}
        </ul>
      </div>
    </div>
    <Footer/>
    </>
  )
}

export default Home;
