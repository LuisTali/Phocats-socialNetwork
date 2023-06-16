import React, {useState, createContext} from 'react';

export const UserContext = createContext();

const UserContextProvider = ({children}) =>{
    const [userr,setUserr] = useState({});
    const [logged,setLogged] = useState(false);

    return <UserContext.Provider value = {data}>{children}</UserContext.Provider>
}

export default UserContextProvider;