import { createContext, useContext, useEffect, useState } from "react";
import type { Reservation } from "./Types";
import { apiClient } from "../services/apiClient";
import { useVehiculesContext } from "./VehiculesContext";
import { useAuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";

interface ReservationContextType{
    reservations : Reservation[];
    addReservation : (reservation : Reservation)=>Promise<void>;
    error : string | null;
    getReservations : () => Promise<void>;
    cancelReservation : (reservationId : string) => Promise<void>
    loadingReservations : boolean | null;
    getAllReservations : () => Promise<void>
    allReservations : Reservation[];
    updateReservationStatus : (status : string, reservationId : string)=>Promise<void>
}

const ReservationContext = createContext<ReservationContextType | null>(null);

export const ReservationProvider = ({children} : {children : React.ReactNode}) => {

    const [error, setError] = useState<string | null>(null);
    const {getVehicules} = useVehiculesContext();
    const {currentUser} = useAuthContext();
    const navigate = useNavigate();
    const [loadingReservations, setLoadingReservations] = useState<boolean>(false);

    const [reservations, setReservations] = useState<Reservation[]>([]);
    const [allReservations, setAllReservations] = useState<Reservation[]>([]);

    const addReservation = async(reservation : Reservation) => {

        setLoadingReservations(true);
        try{

          const res = await apiClient("http://localhost:5000/api/v1/reservations/add", {
             method : 'POST',
             headers: {
                "Content-Type" : "application/json"
             },
             body : JSON.stringify(reservation)
          });

          const data = await res.json();

          if(!res.ok){
            setError(data.error || data.message || "Error in adding reservation");
            return;
          }

          setError(null);
          await getVehicules();
          await getReservations();
          navigate('/reservations');
          
        }catch(err){
            console.error(err);
        }finally{
            setLoadingReservations(false);
        }

    }

    const getReservations = async() => {

        if(!currentUser) return;


        try{
             
            const res = await apiClient(`http://localhost:5000/api/v1/reservations/user/${currentUser._id}`,
                {
                    method : "GET"
                });

            const data = await res.json();

            if(!res.ok){
                setError(data.error || data.message || "Error in getting user reservations");
                return;
            }

            setError(null);
            setReservations(data.data);
            console.log(data.data);
        }catch(err){
            console.error(err);
        }

    }


    const cancelReservation = async(id: string) => {

        if(!currentUser) return;

        try{

            const res = await apiClient(`http://localhost:5000/api/v1/reservations/cancel/${id}`, {
                method : 'PUT',
                headers : {
                    "Content-Type" : "application/json"
                }
            });

            const data = await res.json();

            if(!res.ok){
                setError(data.error || data.message || "Error in cancelling reservation");
                return;
            }

            setError(null);
            await getReservations();
            await getVehicules();
        }catch(err){
            console.error(err);
        }
    }


    const getAllReservations = async() => {
  
        if(!currentUser || currentUser.role !== "admin") return;
        

        setLoadingReservations(true);
        try{

            const res = await apiClient('http://localhost:5000/api/v1/reservations/all', {
                method : "GET",
            });
        
            const data = await res.json();

            if(!res.ok){
                setError(data.error || data.message || "Error in getting all reservations");
                console.log(data.error || data.message || "Error in getting all reservations");
                return;
            }

            setError(null);

            setAllReservations(data.data);
            console.log(data.data);
            console.log('All reservations : ', allReservations);

        }catch(err){
            console.error(err);
        }finally{
            setLoadingReservations(false);
        }
    }


    const updateReservationStatus = async(status : string, reservationId  : string) => {

        try{
            const res = await apiClient(`http://localhost:5000/api/v1/reservations/update/${reservationId}`,{
                method : "PUT",
                headers : {
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify({status})
            });

            const data = await res.json();

            if(!res.ok){
                console.error(data.message || data.error || "Error in updating user");
                return;
            }

            setError(null);

            await getAllReservations();
            
        }catch(err){
            console.error(err);
        }
    }


    useEffect(()=>{
        if(currentUser?.role === "admin"){
            getAllReservations();
        }

    } , []);

    useEffect(()=>{
        getReservations()
    }, []);


    return(
        <ReservationContext.Provider value={{addReservation, error, reservations, getReservations, cancelReservation, loadingReservations, getAllReservations, allReservations, updateReservationStatus}}>
            {children}
        </ReservationContext.Provider>
    )
}


export const useReservationContext = () => {

    const context = useContext(ReservationContext);

    if(!context){
        throw new Error("Use the useReservationContext inside the ReservationProvider");
    }

    return context;

}

