import React,{useState, createContext, useEffect } from "react";
import useScreensize from '../../components/hooks/useScreensize.jsx';
export const ScreenSizeContext = createContext();

const ScreenSizeContextProvider = ({children}) =>{
    const size = useScreensize();
    const [mobile,setMobile] = useState(false);

    useEffect(()=>{
        if(size < 1140){
            setMobile(true) 
        } 
        else setMobile(false);
    },[size]);

    const data = {mobile};

    return <ScreenSizeContext.Provider value={data}>{children}</ScreenSizeContext.Provider>
}

export default ScreenSizeContextProvider;