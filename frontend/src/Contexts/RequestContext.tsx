import { createContext, useContext, useState } from "react"


interface RequestContextType{

    addRequest : (name : string, email : string, organization : string, phoneNumber : string, description : string, recaptchaToken : string)=>Promise<void>
    error : string | null;
    msg : string;
}


const RequestContext = createContext<RequestContextType | null>(null);

export const RequestProvider = ({children} : {children : React.ReactNode}) => {

    const [error, setError] = useState<string | null>(null);
    const [msg, setMsg] = useState<string>("");

    const addRequest = async(name : string, email : string, organization : string, phoneNumber : string, description : string, recaptchaToken : string) => {

        try{

            const res = await fetch(`http://localhost:5000/api/v1/requests/add`, {
                method : 'POST',
                headers : {
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify({name, email, organization, phoneNumber, description, recaptchaToken})
            });

            const data = await res.json();

            if(!res.ok){
               setError(data.error || data.message || "Error in adding request");
               return;
            }

            setError(null);
            
            setMsg("Thank you! Your request has been submitted successfully. Our team will review it and contact you for more details.");

            setTimeout(()=>{
                setMsg("");
            }, 5000);

        }catch(err){
            console.error(err);
        }

    }

     return(
        <RequestContext.Provider value={{addRequest, error, msg}}>
            {children}
        </RequestContext.Provider>
     );
}



export const useRequestContext = () => {

    const context = useContext(RequestContext);

    if(!context){
        throw new Error("use the useRequestContext inside the RequestProvider");
    }

    return context;
}


