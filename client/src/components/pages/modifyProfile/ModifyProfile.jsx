import React, { useState } from "react";
import './ModifyProfile.css'

const ModifyProfile = ({user,setShowModifyProfile}) =>{
    const [infoUser,setInfoUser] = useState(user)

    const handleChange = (e) =>{
        const name = e.target.name;
        const value = e.target.value;
        setInfoUser({...infoUser,[name]:value});
    }

    const handleSubmit = async() =>{
        //Enviar info user y que actualice todos los parametros, al tener los datos anteriores, si alguno no se modifico se actualizara pero quedaran iguales en la base de datos
    }

    return <div id="editProfile">
        <button onClick={()=>setShowModifyProfile(false)}>back</button>
        <div className="inputGroup">
            <label>{infoUser.username}</label>
            <input placeholder={infoUser.username} onChange={(e)=>handleChange(e)} name="username"/>
        </div>
        <div className="inputGroup">
            <label>{infoUser.completeName}</label>
            <input placeholder={infoUser.completeName} onChange={(e)=>handleChange(e)} name="completeName"/>
        </div>
        <h5>{infoUser.birthDate}</h5>
        <button onClick={()=>handleSubmit}>submit</button>
    </div>
}

export default ModifyProfile;