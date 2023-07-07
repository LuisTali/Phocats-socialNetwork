import React from "react";
import { useNavigate } from "react-router-dom";

const ButtonBack = ({previousUrl}) =>{
    const navigate = useNavigate();

    const handleClick = () =>{
        console.log(previousUrl);
        navigate(previousUrl);
    }

    return <button className="backBtn" onClick={handleClick}>back</button>
}

export default ButtonBack;