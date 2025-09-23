import { createContext } from "react";
import { useAuthContext } from "./AuthContext";


interface UsersContextType{

    getProfile : () => Promise<void>;
}


const UsersContext = createContext<UsersContextType | null>(null);

export const UsersContextProvider = ({children} : {children : React.ReactNode}) => {

    const {currentUser} = useAuthContext();

  

}