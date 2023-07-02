import React, { useState } from "react";
import {AppContext} from '../../../Index.jsx'
import './ModifyProfile.css'
import axios from "axios";

const ModifyProfile = ({user,setShowModifyProfile}) =>{
    const [infoUser,setInfoUser] = useState(user);
    const [file,setFile] = useState(null);
    const {baseUrl} = React.useContext(AppContext);
    
    const handleChange = (e) =>{
        if(e.target.type != 'file'){
            const name = e.target.name;
            const value = e.target.value;
            setInfoUser({...infoUser,[name]:value});  
        }else{
            console.log(e.target.files[0]);
            setFile(e.target.files[0]);
            console.log(infoUser);
        }
    }

    const handleSubmit = async(e) =>{
        e.preventDefault();
        try {
            if(file){
                let description = infoUser.userDescription == null ? 'No hubo tiempo de reflexion' :  infoUser.userDescription;
                let formData = new FormData();
                formData.append('profileImg',file);
                formData.append('username',infoUser.username);
                formData.append('userDescription',description);
                formData.append('completeName',infoUser.completeName);
                formData.append('id',infoUser.id);
                const config = {
                    headers: {
                        'content-type': 'multipart/form-data'
                    }
                };
                const response = await axios.post(`${baseUrl}user/edit`,formData,config);
                console.log(response);
                if(response.data.success == true) setShowModifyProfile(false);  
                else alert('algo anduvo mal')
            }else{
                let description = infoUser.userDescription == 'null' ? 'No hubo tiempo de reflexion' :  infoUser.userDescription;
                console.log(description);
                const response = await axios.post(`${baseUrl}user/editNoPhoto`,{encryptedName:infoUser.profileImg,username:infoUser.username,userDescription:description,completeName:infoUser.completeName,id:infoUser.id});
                if(response.data.success == true) setShowModifyProfile(false); 
            }
            
        } catch (error) {
            console.log(error);
        }
        //Enviar info user y que actualice todos los parametros, al tener los datos anteriores, si alguno no se modifico se actualizara pero quedaran iguales en la base de datos
    }

    return <div id="editProfile">
        <button onClick={()=>setShowModifyProfile(false)}>back</button>
        <form>
            <div className="inputGroup inputFile">
                <label>ProfileImg</label>
                <input type="file" name="profileImg" onChange={(e)=>handleChange(e)} accept="image/*"/>
            </div>
            <div className="inputGroup">
                <label>Username</label>
                <input placeholder={infoUser.username} onChange={(e)=>handleChange(e)} name="username"/>
            </div>
            <div className="inputGroup">
                <label>UserDescription</label>
                <input placeholder={infoUser.userDescription} onChange={(e)=>handleChange(e)} name="userDescription"/>
            </div>
            <div className="inputGroup">
                <label>Complete Name</label>
                <input placeholder={infoUser.completeName} onChange={(e)=>handleChange(e)} name="completeName"/>
            </div>
            <div className="inputGroup">
            <label>BirthDate</label>
            <input placeholder={infoUser.birthDate}/>
            </div>
            <button className="confirmEdit" onClick={(e)=>handleSubmit(e)}>Edit</button>
        </form>
    </div>
}

export default ModifyProfile;