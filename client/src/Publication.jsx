import React from "react"

const Publication = ({id,textDescription,imgName,idUser}) =>{
    return <article className='publication' key={id}>
      <div className='profilePublication'>{idUser}</div>
      {textDescription}
      <img src={`http://localhost:5000/${imgName}`}/>
    </article>
}

export default Publication;