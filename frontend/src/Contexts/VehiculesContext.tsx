import { createContext, useContext, useEffect, useState } from "react";
import type { Vehicule } from "./Types";

interface FilterType{
    seats : number;
    category : string;
    transmission : string;
    fuelType : string;
}
interface VehiculesContextType{
    vehicules : Vehicule[];
    error : string | null;
    getVehicules : ()=>Promise<void>
    loadingVehicules : boolean;
    filterData: FilterType;
    setFilterData : (f : FilterType) => void;
   
}

const VehiculesContext = createContext<VehiculesContextType | null>(null);

export const VehiculesProvider = ({children} : {children : React.ReactNode}) => {

    const [vehicules, setVehicules] = useState<Vehicule[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loadingVehicules, setLoadingVehicules] = useState<boolean>(false);

    const [filterData, setFilterData] = useState<FilterType>(()=>{
        const saved = localStorage.getItem('filterData');

        return saved ? JSON.parse(saved) : {
            seats : 0,
            category : "",
            transmission : "",
            fuelType : ""
        }
    });

    useEffect(()=>{
        localStorage.setItem('filterData', JSON.stringify(filterData));
    }, [filterData]);
        

    const getVehicules = async() => {

        setLoadingVehicules(true);
        try{
            
            const res = await fetch("http://localhost:5000/api/v1/vehicules/", {
                method : "POST",
                headers : {
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify({seats : filterData.seats ,category : filterData.category, transmission : filterData.transmission, fuelType : filterData.fuelType})
            });

            const data = await res.json();

            if(!res.ok){
                setError(data.error || data.message || "Error in getting all vehicules");
                return;
            }
            
            setError(null);

            setVehicules(data.data);
            console.log(data.data);

        }catch(err){
            console.error(err);
        }finally{
            setLoadingVehicules(false);
        }
    }




    useEffect(()=>{
        getVehicules();
    }, [filterData]);

   

    return(
        <VehiculesContext.Provider value={{vehicules, error, getVehicules, loadingVehicules, filterData, setFilterData}}>
            {children}
        </VehiculesContext.Provider>
    );
}


export const useVehiculesContext = () => {

    const context = useContext(VehiculesContext);

    if(!context){
        throw new Error("use the useVehiculesContext inside the vehicules provider");
    } 

    return context;
}



