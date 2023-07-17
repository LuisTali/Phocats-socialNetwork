//Context to handle when the MakePublication component is open
import react,{useState,createContext} from 'react';

export const UploadContext = createContext();

const UploadContextProvider = ({children}) =>{
    const [uploadOpen,setUploadOpen] = useState(false);

    const data = {
        uploadOpen,
        setUploadOpen
    }

    return <UploadContext.Provider value={data}>{children}</UploadContext.Provider>
}

export default UploadContextProvider;
