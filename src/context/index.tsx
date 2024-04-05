import React, { useContext } from "react";
import { useAccount } from "wagmi";
const StateContext = React.createContext(null)
export const StateContextProvider = ({ children }) => {
    const { isConnected, address } = useAccount();


    return (
        <StateContext.Provider
            value={{
                isConnected, address
            }}
        >
            {children}
        </StateContext.Provider>
    );
}

export const useStateContext = () => useContext(StateContext);

