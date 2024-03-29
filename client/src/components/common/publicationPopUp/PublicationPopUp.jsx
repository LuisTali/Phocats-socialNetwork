import React,{useState, useRef, useContext} from "react";
import { Link, useNavigate } from "react-router-dom";
import OptionsDropdown from "../optionsDropdown/OptionsDropdown.jsx";
import { AppContext } from "../../../Index.jsx";
import axios from "axios";
import './PublicationPopUp.css';
import { LocationContext } from "../../../context/locationContext/LocationContext.jsx";

const PublicationPopUp = ({id,imgsrc,madeIn,idUser,userCreator,textDescription,setShowPopUp}) =>{
    const {baseUrl,idUserLogged} = useContext(AppContext); //Obtiene el Id del usuario loggeado para comprobar y habilitar el boton Edit
    const {lastLocation,setLastLocation} = useContext(LocationContext);
    const [showInfo,setShowInfo] = useState(false);
    const [showEdit,setShowEdit] = useState(false);
    const [textPublication,setTextPublication] = useState(textDescription);
    const refInput = useRef(textDescription);
    const navigate = useNavigate();


    const handleEditClick = async() =>{
        //Logica al finalizar de editar la descripcion, enviarla con axios al server y cerrar showEdit
        const valueI = refInput.current.value;
        if(valueI != textDescription && valueI != ""){
            setShowEdit(false);
            const response = await axios.post(`${baseUrl}publication/edit`,{id,textDescription:valueI});
            setTextPublication(valueI);
            navigate(lastLocation);
            window.location.reload(true);
        }else{
            setShowEdit(false);
            return;
        }
    }
    const handleClickShowInfo = () =>{
        setShowInfo(!showInfo);
        setShowEdit(false);
    }
    const deletePublication = async() =>{
        try {
            const response = await axios.post(`${baseUrl}publication/delete/${id}`,{textDescription});
            setTimeout(()=>window.location.reload(true),2000);
        } catch (error) {
            console.log(error);
        }
    }

    return <div className="popUp" >
        <button className="popUpBack" onClick={()=>setShowPopUp(false)}>{`X`}</button>
        {idUserLogged == idUser && <OptionsDropdown setShowEdit={setShowEdit} setShowInfo={setShowInfo} deletePublication={deletePublication} showEdit={showEdit}/>}
        <div className="imgContainer" onClick={()=>handleClickShowInfo()}>
            <img src={imgsrc}/>
        </div>
        <div className={showInfo ? "userContainer showInfo" : "userContainer"} >
            <div className="publicationInfoDiv">
                <Link onClick={()=>setShowPopUp(false)} to={`/user/${idUser}`}><h2>{userCreator}</h2></Link>
                {showEdit ? <input ref={refInput} className="editPublicationInput" placeholder={textDescription}/> : <h3>{textPublication}</h3> }
                {showEdit && <button className="confirmEdit" onClick={handleEditClick}>edit</button>}
            </div>
            <div className="dateDiv">
                <h4 className="date">{madeIn}</h4>
            </div>
        </div>
    </div>
}

export default PublicationPopUp;