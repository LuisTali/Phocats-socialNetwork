import React from "react"
import { Link } from "react-router-dom"
import './Publication.css'

const Publication = ({id,textDescription,imgName,idUser,userCreator}) =>{

    return <article className='publication' key={id}>
      <div className='profilePublication'><Link to={`/user/${idUser}`}>{userCreator}</Link></div>
      {textDescription}
      <img src={`http://localhost:5000/${imgName}`}/>
    </article>
}

export default Publication;