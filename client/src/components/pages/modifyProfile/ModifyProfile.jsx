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
            setFile(e.target.files[0]);
        }
    }

    const handleSubmit = async(e) =>{
        e.preventDefault();
        try {
            let imgSrc = infoUser.profileImg;
            if(file){
                const formData = new FormData();
                formData.append("file",file);
                formData.append("upload_preset","vz9nfppp");
                let res = await axios.post("https://api.cloudinary.com/v1_1/dvcmeanik/image/upload",formData);
                imgSrc = res.data.secure_url;
            }
                let description = infoUser.userDescription == null ? 'No hubo tiempo de reflexion' :  infoUser.userDescription;

                const response = await axios.post(`${baseUrl}user/edit`,{username:infoUser.username,completeName:infoUser.completeName,userDescription:description,id:infoUser.id,imgSrc:imgSrc});

                if(response.data.success == true) setShowModifyProfile(false);  
                else alert('algo anduvo mal')
            
        } catch (error) {
            console.log(error);
        }
        //Enviar info user y que actualice todos los parametros, al tener los datos anteriores, si alguno no se modifico se actualizara pero
    }

    return <div className="editProfileFormContainer">
        
        <button className="unshowModifyForm" onClick={()=>setShowModifyProfile(false)}>back</button>
        <div id="editProfile">
        <form className="modifyProfileForm">
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
    </div>
}

export default ModifyProfile;