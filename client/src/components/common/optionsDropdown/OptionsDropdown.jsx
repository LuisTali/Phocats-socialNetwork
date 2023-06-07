import React, {useState} from "react";
import './OptionsDropdown.css';

const OptionsDropdown = ({setShowEdit,setShowInfo}) =>{
    const [clicked,setClicked] = useState(false);

    const handleClickEdit = () =>{
        setShowEdit(true);
        setShowInfo(true);
        setClicked(!clicked);
    }
    const handleClickDelete = () =>{

    }

    return <div className="optionsDropDownPublication">
    <i onClick={()=>setClicked(!clicked)} className={clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
    <ul className={!clicked ? "optionsPubli show" : "optionsPubli notShow"}>
        <li onClick={()=>{handleClickEdit()}}>Edit</li>
        <li onClick={()=>{handleClickDelete()}}>Delete</li>
    </ul>
    </div>
}

export default OptionsDropdown;