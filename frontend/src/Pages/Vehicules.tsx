import { memo } from "react"
import { useVehiculesContext } from "../Contexts/VehiculesContext";
import VehiculeCard from "../Components/VehiculesComponents/VehiculeCard";
import FilterComponent from "../Components/VehiculesComponents/FilterComponent";
import GeneralFooter from "../Components/HomeComponents/GeneralFooter";
import Copyright from "../Components/HomeComponents/Copyright";


const Vehicules = () => {

    const {vehicules, loadingVehicules} = useVehiculesContext();

    return(
        <section className="min-h-screen flex flex-col items-center">
           <h1 className="text-black mt-7 font-black text-[2.2em]">Find Your Car Here</h1>  

           <FilterComponent/>  

           {loadingVehicules ?
               <div className="mt-10 mb-15">
                  <i className="fa-solid fa-car-side fa-spin text-[2.5em]"></i>
               </div>
               :
              
                vehicules.length === 0 ?
                 <div className="flex flex-col items-center mt-15 mb-15">
                    <i className="fa-solid fa-calendar-xmark text-[4em] text-orange-500"></i>
                    <p className="mt-3 font-bold text-center">There are no vehicles available based on your criteria.</p>
                    <p className="text-gray-700 text-center">Please adjust the selected filters.</p>
                 </div>
                 :
             <div className="flex flex-wrap justify-center items-center gap-10 mt-10 mb-15">
                {vehicules.map((v)=>{
                    return(
                        <VehiculeCard
                        key={v._id}
                        vehicule={v}
                        />
                    )
                })}
             </div>
             } 

               <GeneralFooter/>
               <Copyright/>
        </section>
    )
}

export default memo(Vehicules);