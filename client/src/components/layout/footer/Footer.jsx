import React,{useContext} from "react";
import MakePubli from "../../common/makePublication/MakePublication.jsx";
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { AppContext } from "../../../Index.jsx";
import './Footer.css';

const Footer = ({lastLocation,uploadOpen,setUploadOpen}) =>{
    const {id,username,baseUrl,forceRender,setForceRender} = useContext(AppContext);

    return <div id="footer">
        {uploadOpen && <MakePubli forceRender={forceRender} setForceRender={setForceRender} id={id} username={username} baseUrl={baseUrl} setUploadOpen={setUploadOpen} uploadOpen={uploadOpen}/>}
        <button className="openMakePubli" onClick={()=>setUploadOpen(!uploadOpen)}><FileUploadIcon/>Upload</button>
    </div>
}

export default Footer;