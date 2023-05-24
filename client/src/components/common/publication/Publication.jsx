import React from "react"
import { Link, useNavigate } from "react-router-dom"
import PropTypes from 'prop-types';
import './Publication.css'

const Publication = ({id,textDescription,imgName,idUser,userCreator,madeIn}) =>{
  const navigate = useNavigate();
  
  if(textDescription == 'undefined') textDescription = null;
    
    const handleClick = () =>{
      navigate(`/publication/${id}`);
    }

    return <article className='publication' key={id} >
      <div className='profilePublication'>
        <Link to={`/user/${idUser}`}>{userCreator}</Link> <h4>{madeIn}</h4>
      </div>
      <div className="publicationContent" onClick={handleClick}>
        {textDescription}
        <img src={`http://localhost:5000/${imgName}`} />
      </div>
    </article>
}

export default Publication;