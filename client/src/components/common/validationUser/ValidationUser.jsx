import React, { useState, useEffect } from "react";
import { AppContext } from "../../../Index.jsx";
import axios from "axios";

const ValidationUser = () =>{
    const [tokenToCheck,setTokenToCheck] = useState(null);
    const {baseUrl} = React.useContext(AppContext);
    
    const generateToken = async() =>{
        const response = await axios.get(`${baseUrl}user/validateToken`);
        setTokenToCheck(response.data.token);
        console.log(response.data.token);
    }
    
    useEffect(()=>{
        generateToken();
    },[]);

    return <div className="accountsForms">
        <form>
        <h2>Validate your account</h2>
        <div className="inputGroup">
            <label>Token</label>
            <input type="text" name="username" onChange={(e)=>handleChange(e)}/>
        </div>
        <button className="btn">validate</button>
        </form>
    </div>
}

export default ValidationUser;