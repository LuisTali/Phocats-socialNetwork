import React, {useState} from "react";
import './OptionsDropdown.css';

const OptionsDropdown = ({setShowEdit}) =>{
    const [clicked,setClicked] = useState(false);

    const handleClick = () =>{
        setShowEdit(true);
        setClicked(!clicked);
    }
    return <>
    <i onClick={()=>setClicked(!clicked)} className={clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
    <ul className={!clicked ? "optionsPubli show" : "optionsPubli notShow"}>
        <li onClick={()=>{handleClick()}}>Edit</li>
    </ul>
    </>
}

export default OptionsDropdown;