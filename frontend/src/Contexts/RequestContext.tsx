import { createContext, useContext, useEffect, useState } from "react"
import { apiClient } from "../services/apiClient";
import type { Request } from "./Types";
import { useAuthContext } from "./AuthContext";

interface RequestContextType{

    addRequest : (name : string, email : string, organization : string, phoneNumber : string, description : string, recaptchaToken : string)=>Promise<void>
    error : string | null;
    msg : string;
    loadingRequests : boolean;
    requests : Request[];
    getAllRequests : ()=>Promise<void>
    updateRequestStatus : (status : string, requestId : string)=>Promise<void>
    requestsSearch : Request[] | null;
    searchRequest : (search : string)=>Promise<void>
    unChechedRequests : Request[];
}



const RequestContext = createContext<RequestContextType | null>(null);

export const RequestProvider = ({children} : {children : React.ReactNode}) => {

    const [error, setError] = useState<string | null>(null);
    const [msg, setMsg] = useState<string>("");
    const [loadingRequests, setLoadingRequests] = useState<boolean>(false);
    const [requests, setRequests] = useState<Request[]>([]);
    const {currentUser} = useAuthContext();
    const [requestsSearch, setRequestsSearch] = useState<Request[] | null>(null);
    const [unChechedRequests, setUnChechedRequests] = useState<Request[]>([]);

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


    const getAllRequests = async() => {

        setLoadingRequests(true);
        if(!currentUser || currentUser.role !== "admin") return;

        try{
            const res = await apiClient("http://localhost:5000/api/v1/requests/", {
                method : "GET"
            });

            const data = await res.json();

            if(!res.ok){
                setError(data.data || data.error || "Error in fetching all requests");
                console.error(data.data || data.error || "Error in fetching all requests");
                return;
            }

            setError(null);
 
            setRequests(data.data);
            console.log("All Requests : ", data.data);

        }catch(err){
            console.error(err);
        }finally{
            setLoadingRequests(false);
        }
    }


    const updateRequestStatus = async(status : string, requestId : string)=>{

        if(!currentUser || currentUser.role !== "admin") return;

        try{
            const res = await apiClient(`http://localhost:5000/api/v1/requests/${requestId}`, {
                method : "PUT",
                headers : {
                    "Content-Type" : "application/json",

                },
                body : JSON.stringify({status})
            });

            const data = await res.json();

            if(!res.ok){
               console.error(data.data || data.error || "Error in updating request");
               return;
            } 

            await getAllRequests();

        }catch(err){
            console.error(err);
        }
    }

    const searchRequest = async(search : string) => {

        try{

            const res = await apiClient("http://localhost:5000/api/v1/requests/search", {
                method : "POST",
                headers : {
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify({search})
            });

            const data = await res.json();

            if(!res.ok){
                console.error(data.data || data.error || "Error in Searching request");
                return;
            }

            setRequestsSearch(data.data);

        }catch(err){
            console.error(err);
        }
    }

    const getuncheckeRequests = async() => {

        try{
        const res = await apiClient("http://localhost:5000/api/v1/requests/unChecked", {
            method : "GET"
        });

        const data = await res.json();

        if(!res.ok){
                            console.error(data.data || data.error || "Error in Searching request");
                return;
        }

        setUnChechedRequests(data.data);
    }catch(err){
        console.error(err);
    }
    }

    useEffect(()=>{
        if(!currentUser || currentUser.role !== "admin") return;
        getuncheckeRequests();
    }, []);

    useEffect(()=>{
        if(currentUser?.role === "admin"){
          getAllRequests();
        }

    }, []);


     return(
        <RequestContext.Provider value={{addRequest, error, msg, loadingRequests, getAllRequests, updateRequestStatus, requests, requestsSearch, searchRequest, unChechedRequests}}>
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


