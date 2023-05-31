import React,{useState} from "react";
import { Link } from "react-router-dom";
import './PublicationPopUp.css';
const PublicationPopUp = ({imgsrc,madeIn,idUser,userCreator,textDescription,setShowPopUp}) =>{

    const [showInfo,setShowInfo] = useState(false);

    return <div className="popUp" onClick={()=>setShowInfo(!showInfo)}>
        <button className="popUpBack" onClick={()=>setShowPopUp(false)}>{`<-- back`}</button>
        <div className="imgContainer">
            <img src={imgsrc}/>
        </div>
        <div className={showInfo ? "userContainer showInfo" : "userContainer"}>
            <div>
                <Link to={`/user/${idUser}`}><h2>{userCreator}</h2></Link>
                <h3>{textDescription}</h3>
            </div>
            <div>
                <h4 className="date">{madeIn}</h4>
            </div>
        </div>
    </div>
}

export default PublicationPopUp;