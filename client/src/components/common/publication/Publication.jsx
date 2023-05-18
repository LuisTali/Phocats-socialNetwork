import React from "react"
import './Publication.css'

const Publication = ({id,textDescription,imgName,idUser,userCreator}) =>{
    return <article className='publication' key={id}>
      <div className='profilePublication'>{userCreator}</div>
      {textDescription}
      <img src={`http://localhost:5000/${imgName}`}/>
    </article>
}

export default Publication;