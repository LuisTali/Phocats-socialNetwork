import React, {useState} from "react";
import Swal from 'sweetalert2'
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
        Swal.fire({
            title: 'Do you want to delete the publication?',
            showDenyButton: true,
            confirmButtonText: 'Delete',
            denyButtonText: `Don't delete`,
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                deletePublication();
                Swal.fire('Deleted!', '', 'success')
            } else if (result.isDenied) {
                Swal.fire('Not deleted!', '', 'error')
            }
          })
        
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