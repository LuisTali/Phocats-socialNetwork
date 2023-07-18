import React from "react";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { useNavigate } from "react-router-dom";

const ButtonBack = ({previousUrl}) =>{
    const navigate = useNavigate();

    const handleClick = () =>{
        navigate(previousUrl);
    }

    return <button className="backBtn" onClick={handleClick}><ArrowBackIcon/></button>
}

export default ButtonBack;