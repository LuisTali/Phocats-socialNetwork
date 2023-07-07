import React from "react";
import { useNavigate } from 'react-router-dom';
import './Tag.css';

const Tag = ({nameTag,cantUsados}) =>{
  const navigate = useNavigate();

  const handleClick = () =>{
    navigate(`/tags/${nameTag}`);
  }

  return <li key={nameTag} className='liTag' onClick={handleClick}><h3 className="nameTag">{nameTag}</h3> - <h3 className="cantUsados">{cantUsados}</h3></li>
}

export default Tag;