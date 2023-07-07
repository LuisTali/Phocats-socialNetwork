import React, {useState} from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';

const ShowPass = ({showPassword,showPass}) =>{ 
    
    return <VisibilityIcon onClick={()=>showPassword(!showPass)}/>
}
export default ShowPass;