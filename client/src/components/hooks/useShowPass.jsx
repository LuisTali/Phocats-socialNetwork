import { useState } from "react";

export const useShowPass = () =>{
    const [showPass,setShowPass] = useState(false);

    const showPassword = () =>{
        setShowPass(!showPass);
    }

    return {showPass,showPassword};
}