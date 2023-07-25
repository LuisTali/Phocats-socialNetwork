import react,{ useEffect,useState } from "react";

const useScreensize = () =>{

    const [width,setWidth] = useState(window.innerWidth);

    useEffect(()=>{
        window.addEventListener('resize',handleResize);

        return () => {
            window.removeEventListener('resize',handleResize);
        }
    },[width]);

    const handleResize = () =>{
        setWidth(window.innerWidth);
    }

    return width;
}

export default useScreensize;