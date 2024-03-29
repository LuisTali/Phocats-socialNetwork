import React,{useState} from "react"
import { Link, useNavigate } from "react-router-dom"
import PropTypes from 'prop-types';
import PublicationPopUp from "../publicationPopUp/PublicationPopUp";
import './Publication.css'
import { AppContext } from "../../../Index.jsx";

const Publication = ({id,textDescription,imgName,idUser,userCreator,madeIn,profileImg}) =>{
  const navigate = useNavigate();
  const [showPopUp,setShowPopUp] = useState(false);
  if(textDescription == 'undefined') textDescription = null;

  const handleClick = () =>{
      setShowPopUp(!showPopUp);
  }
    
  return <article className='publication'>
    <div className='profilePublication'>
      <Link to={`/user/${idUser}`}><img className='profileImgPublication' src={profileImg}/>{userCreator}</Link> <h4>{madeIn}</h4>
    </div>
    <div className="publicationContent">
      <span className="textDescription">{textDescription}</span>
      <img src={`${imgName}`}  onClick={handleClick}/>
    </div>
    {showPopUp && <PublicationPopUp id={id} imgsrc={imgName} textDescription={textDescription} idUser={idUser} userCreator={userCreator} madeIn={madeIn} setShowPopUp={setShowPopUp}/>}
  </article>
}

export default Publication;