import React from "react"
import { Link } from "react-router-dom"
import PropTypes from 'prop-types';
import './Publication.css'

const Publication = ({id,textDescription,imgName,idUser,userCreator}) =>{
    if(textDescription == 'undefined') textDescription = null;
    return <article className='publication' key={id}>
      <div className='profilePublication'><Link to={`/user/${idUser}`}>{userCreator}</Link></div>
      {textDescription}
      <img src={`http://localhost:5000/${imgName}`}/>
    </article>
}

export default Publication;