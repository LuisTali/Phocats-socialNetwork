import React,{useState} from "react";
import { Link } from "react-router-dom";
import OptionsDropdown from "../optionsDropdown/OptionsDropdown.jsx";
import './PublicationPopUp.css';
const PublicationPopUp = ({imgsrc,madeIn,idUser,userCreator,textDescription,setShowPopUp}) =>{

    const [showInfo,setShowInfo] = useState(false);
    const [showEdit,setShowEdit] = useState(false);
    //{'Debo obtener el id del usuario loggeado y compararlo con el de la publicacion, de ser asi habilitar boton Editar'}

    const handleEditClick = () =>{
        //Logica al finalizar de editar la descripcion, enviarla con axios al server y cerrar showEdit
        setShowEdit(false);
    }

    return <div className="popUp" onClick={()=>setShowInfo(!showInfo)}>
        <button className="popUpBack" onClick={()=>setShowPopUp(false)}>{`<-- back`}</button>
        <OptionsDropdown setShowEdit={setShowEdit}/>
        <div className="imgContainer">
            <img src={imgsrc}/>
        </div>
        <div className={showInfo ? "userContainer showInfo" : "userContainer"}>
            <div>
                <Link to={`/user/${idUser}`}><h2>{userCreator}</h2></Link>
                {showEdit ? <input placeholder={textDescription}/> : <h3>{textDescription}</h3> }
                {showEdit && <button onClick={handleEditClick}>edit</button>}
            </div>
            <div>
                <h4 className="date">{madeIn}</h4>
            </div>
        </div>
    </div>
}

export default PublicationPopUp;