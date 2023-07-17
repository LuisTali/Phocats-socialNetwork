import React, {useState} from "react";
import './OptionsDropdown.css';

const OptionsDropdown = ({setShowEdit,setShowInfo,deletePublication,showEdit}) =>{
    const [clicked,setClicked] = useState(false);

    const handleClickEdit = () =>{
        setShowEdit(true);
        setShowInfo(true);
        setClicked(!clicked);
    }
    const handleClickDiscard = () =>{
        setShowEdit(false);
        setClicked(false);
    }
    const handleClickDelete = () =>{
        deletePublication();
    }

    return <div className="optionsDropDownPublication">
    <i onClick={()=>setClicked(!clicked)} className={clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
    <ul className={!clicked ? "optionsPubli show" : "optionsPubli notShow"}>
        {showEdit ? <li onClick={()=>{handleClickDiscard()}}>Discard X</li> : <li onClick={()=>{handleClickEdit()}}>Edit</li>}
        <li className="separator"/>
        <li onClick={()=>{handleClickDelete()}}>Delete</li>
    </ul>
    </div>
}

export default OptionsDropdown;