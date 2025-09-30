import { createContext, useEffect, useState , useContext} from "react";
import { useAuthContext } from "./AuthContext";
import { apiClient } from "../services/apiClient";
import type { User } from "./Types";



interface UsersContextType{

    getProfile : () => Promise<void>;
    error : string | null;
    loadingUsers : boolean;
    users : User[];
    getAllUsers : ()=>Promise<void>
    deleteUser : (userId : string)=>Promise<void>
    updateUserRole : (role : string, userId : string)=>Promise<void>
    searchUser : (s : string)=>Promise<void>
    usersSearch : User[] | null;
}


const UsersContext = createContext<UsersContextType | null>(null);

export const UsersContextProvider = ({children} : {children : React.ReactNode}) => {

    const {currentUser, setCurrentUser} = useAuthContext();
    const [users, setUsers] = useState<User[]>([]);

    const [error, setError] = useState<string | null>(null);
    const [loadingUsers, setLoadingUsers] = useState<boolean>(false);
    const [usersSearch, setUsersSearch] = useState<User[] | null>(null);


    const getProfile = async() => {

        try{
        const res = await apiClient('http://localhost:5000/api/v1/users/me', {
            method : "GET"
        });

        const data = await res.json();

        if(!res.ok){
            setError(data.message || data.error || "Errir in getting user profile");
            return;
        }

        setError(null);
        setCurrentUser(data.data);
      }catch(err){
        console.error(err);
      }

    }


    const getAllUsers = async() => {

        setLoadingUsers(true);

        if(!currentUser || currentUser.role !== "admin") return;

        try{

            const res = await apiClient('http://localhost:5000/api/v1/users/all', {
                method : "GET"
            });

            const data = await res.json();

            if(!res.ok){
                setError(data.error || data.message || "Error in getting all users");
                return;
            }

            setError(null);
            setUsers(data.data);
            console.log(data.data);

        }catch(err){
            console.error(err);
        }finally{
            setLoadingUsers(false);
        }

    }


    const deleteUser = async(userId : string) => {

        setLoadingUsers(true);
        
        try{

            const res = await apiClient(`http://localhost:5000/api/v1/users/delete/${userId}`, {
                method : "DELETE",
            });

            const data = await res.json();

            if(!res.ok){
                setError(data.error || data.message || "Error in deleting user");
                return;
            }

            setError(null);

            await getAllUsers();
        }catch(err){
            console.error(err);
        }finally{
            setLoadingUsers(false);
        }
    }


    const updateUserRole = async(role : string, userId : string) => {

        try{

            const res = await apiClient(`http://localhost:5000/api/v1/users/update/${userId}`, {
                method : 'PUT',
                headers: {
                  "Content-Type" : "application/json"
                },
                body : JSON.stringify({role})
            });

            const data = await res.json();

            if(!res.ok){
                console.log(data.error || data.message || "Error in updating user");
                return;
            }

            await getAllUsers();
        }catch(err){
            console.error(err);
        }
    }

    const searchUser = async(s : string) => {

        try{

            const res = await apiClient("http://localhost:5000/api/v1/users/search", {
                method :"POST",
                headers : {
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify({search : s})
            });

            const data = await res.json();

            if(!res.ok){
                console.log(data.error || data.message || "Error in updating user");
                return;
            }

            setUsers(data.data);
            

        }catch(err){
            console.error(err);
        }
    }
    useEffect(()=>{
        getAllUsers();
    }, []);
    
    
    useEffect(()=>{
        getProfile();
    }, []);
  

    return(
        <UsersContext.Provider value={{loadingUsers, users, getAllUsers, getProfile, deleteUser, error, updateUserRole, searchUser, usersSearch }}>
            {children}
        </UsersContext.Provider>
    )
}


export const useUsersContext = () => {

    const context = useContext(UsersContext);

    if(!context){
        throw new Error("use the useUsersContext inside the UsersProvider");
    }

    return context;
}