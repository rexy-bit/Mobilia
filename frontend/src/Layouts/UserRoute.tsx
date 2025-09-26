import { memo } from "react";
import { useAuthContext } from "../Contexts/AuthContext"
import { Navigate } from "react-router-dom";



const UserRoute = ({children} : {children : React.ReactNode}) => {

    const {currentUser} = useAuthContext();

    if(currentUser && currentUser.role === "admin"){
        return <Navigate to="/admin/dashboard"/>
    }

    return <>{children}</>
}


export default memo(UserRoute);