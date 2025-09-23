import { createContext, useContext, useEffect, useState } from "react";
import type { User } from "./Types";



interface AuthContextType{
    currentUser : User | null;
    error : string | null;
    signUp : (name :string, email : string, password : string)=>Promise<void>
    signIn : (email : string, password : string)=>Promise<void>
    signOut : ()=>Promise<void>
}



const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({children} : {children : React.ReactNode}) => {

    const [currentUser, setCurrentUser] = useState<User | null>(()=>{
        try {
    const saved = localStorage.getItem("currentUser");

    // si rien en storage → null
    if (!saved) return null;

    // si jamais quelqu’un a mis "undefined" ou "null" → null
    if (saved === "undefined" || saved === "null") {
      localStorage.removeItem("currentUser"); // nettoyage
      return null;
    }

    return JSON.parse(saved);
  } catch (err) {
    console.error("Invalid JSON in localStorage for currentUser:", err);
    localStorage.removeItem("currentUser"); // purge la valeur corrompue
    return null;
  }
    });

    console.log(currentUser);

    useEffect(()=>{
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
    }, [currentUser]);


  


    const [error, setError] = useState<string | null>(null);
    

    const signUp = async(name : string, email : string, password : string) => {

        try{

        const res = await fetch('http://localhost:5000/api/v1/auth/sign-up', {
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({name, email, password}),
            credentials : "include"
        });

        const data = await res.json();

        if(!res.ok){
            setError(data.error || data.message || "Error in signing up");
            return;
        }

        setError(null);
        setCurrentUser(data.data);

      }catch(err){
         console.error(err);
      }

    }

    const signIn = async(email : string, password : string) => {

           try{

              const res = await fetch("http://localhost:5000/api/v1/auth/sign-in", {
                method : "POST",
                headers : {
                  "Content-Type" : "application/json"
                },
                body : JSON.stringify({email, password}),
                credentials : "include"
              });

              const data = await res.json();

              if(!res.ok){
                setError(data.error || data.message || "Error in signing in");
                return;
              }

              setError(null);
              setCurrentUser(data.data);

           }catch(err){
             console.error(err);
           }
    }


    const signOut = async() => {

        try{

            const res = await fetch("http://localhost:5000/api/v1/auth/sign-out", {
                method : 'POST',
                headers : {
                    "Content-Type" : "application/json"
                },
                credentials : "include"
            });

            const data = await res.json();

            if(!res.ok){
              console.log(data.error || data.message || "error in signing out");
              return;
            }

            setError(null);

            localStorage.removeItem('currentUser');
            setCurrentUser(null);
        }catch(err){
            console.error(err);

        }
    }


    return(
        <AuthContext.Provider value={{currentUser, error, signUp, signIn, signOut}}>
            {children}
        </AuthContext.Provider>
    )
}


export const useAuthContext = () => {

    const context = useContext(AuthContext);

    if(!context){
        throw new Error("Use the useAuthContext inside the AuthProvider");
    }

    return context;
}

