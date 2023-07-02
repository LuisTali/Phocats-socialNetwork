import React, {useState} from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';

const ShowPass = ({showPassword,showPass}) =>{ 
    console.log(showPass);
    console.log(showPassword);
    return <VisibilityIcon onClick={()=>showPassword(!showPass)}/>
}
export default ShowPass;