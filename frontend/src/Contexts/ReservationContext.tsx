import { createContext, useContext, useEffect, useState } from "react";
import type { Reservation } from "./Types";
import { apiClient } from "../services/apiClient";
import { useVehiculesContext } from "./VehiculesContext";
import { useAuthContext } from "./AuthContext";

interface ReservationContextType{
    reservations : Reservation[];
    addReservation : (reservation : Reservation)=>Promise<void>;
    error : string | null;
    getReservations : () => Promise<void>;

}

const ReservationContext = createContext<ReservationContextType | null>(null);

export const ReservationProvider = ({children} : {children : React.ReactNode}) => {

    const [error, setError] = useState<string | null>(null);
    const {getVehicules} = useVehiculesContext();
    const {currentUser} = useAuthContext();

    const [reservations, setReservations] = useState<Reservation[]>([]);

    const addReservation = async(reservation : Reservation) => {

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
          
        }catch(err){
            console.error(err);
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

    useEffect(()=>{
        getReservations()
    }, []);


    return(
        <ReservationContext.Provider value={{addReservation, error, reservations, getReservations}}>
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

