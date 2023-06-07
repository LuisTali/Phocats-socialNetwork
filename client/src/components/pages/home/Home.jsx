import React,{ useEffect, useState, useRef } from 'react'
import axios from 'axios';
import {useLocation} from 'react-router-dom';
import MakePubli from '../../common/makePublication/MakePublication.jsx';
import Publication from '../../common/publication/Publication.jsx';
import Tag from '../../common/tag/Tag.jsx';
import Footer from '../../layout/footer/Footer';
import './Home.css'
import { AppContext } from '../../../Index.jsx';

function Home({username,id}) {
  const [publi,setPublis] = useState([]); //publications in the feed
  const [tags,setTags] = useState([]); //top3 most used tags
  const [loading,setLoading] = useState(true);
  const [empty,setEmpty] = useState(false); 
  const [forceRender,setForceRender] = useState(0); //sumo 1 para forzar re-render
  const {baseUrl,setLastLocation,lastLocation} = React.useContext(AppContext);
  const location = useLocation();

  const uploadPubli = (publication) =>{
    let newPublis = [publication,...publi];
    setPublis(newPublis);
    setEmpty(false);
    setForceRender(forceRender + 1);
  }

  const useFetch = async() =>{
    if(id){
      //borrar
      const publis = await axios.get(`${baseUrl}publication/feed/${id}`);
      setLoading(false);
      if(publis.data.data.length > 0){
        setPublis(publis.data.data);
        setEmpty(false);
      }else{
        setEmpty(true);
      }
    }
  }

  const getMostUsedTags = async() =>{
    const responseTags = await axios.get(`${baseUrl}tag/top3`);
    setTags(responseTags.data.tags);
  }

  useEffect(()=>{
    useFetch();
    getMostUsedTags();
    setLastLocation(location.pathname);
  },[forceRender,id])

  return (
    <>
    <div className='homePage'>
      <div className='feed'>
        <MakePubli uploadPubli={uploadPubli} id={id} username={username}/>

        <hr id="lineaMoviles"/>
        <div className='feedMobile'>
          {(loading && !empty) && <h2 style={{marginTop:'2rem'}}>Loading...</h2>}
          {publi.map((publication) => <Publication {...publication}/>)}
          {empty && <h2 style={{marginTop:'2rem'}}>Looks quite over here</h2>}
        </div>
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
