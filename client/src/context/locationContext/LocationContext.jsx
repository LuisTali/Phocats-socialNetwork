import React, { useState, createContext } from 'react';

export const LocationContext = createContext();

const LocationContextProvider = ({children}) =>{
    const [lastLocation,setLastLocation] = useState('/');

    const data = {
        lastLocation,
        setLastLocation
    }

    return <LocationContext.Provider value={data}>{children}</LocationContext.Provider>
}

export default LocationContextProvider;