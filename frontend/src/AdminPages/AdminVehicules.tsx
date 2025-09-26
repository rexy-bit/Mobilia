import { memo } from "react"
import { useVehiculesContext } from "../Contexts/VehiculesContext";
import FilterComponent from "../Components/VehiculesComponents/FilterComponent";
import AdminVehiculeCard from "../AdminComponents/AdminVehicule/AdminVehiculeCard";
import { useNavigate } from "react-router-dom";



const AdminVehicules = () => {

        const {vehicules, loadingVehicules} = useVehiculesContext();
        const navigate = useNavigate();
    
        return(
            <section className="min-h-screen flex flex-col items-center">
               <h1 className="text-black mt-7 font-black text-[2.2em]">Our Vehicules</h1>

               <button className="px-3 py-2 bg-orange-600 text-white font-bold rounded-[5px] mt-5 mb-5 cursor-pointer transition-opacity duration-200 hover:opacity-70 active:opacity-50"
               onClick={()=>navigate("/admin/add")}
               >+ add vehicule</button>  
    
               <FilterComponent/>
    
               {loadingVehicules ?
                   <div className="mt-10">
                      <i className="fa-solid fa-car-side fa-spin text-[2.5em]"></i>
                   </div>
                   :
                  
                    vehicules.length === 0 ?
                     <div className="flex flex-col items-center mt-15">
                        <i className="fa-solid fa-calendar-xmark text-[4em] text-orange-500"></i>
                        <p className="mt-3 font-bold text-center">There are no vehicles available based on your criteria.</p>
                        <p className="text-gray-700 text-center">Please adjust the selected filters.</p>
                     </div>
                     :
                 <div className="flex flex-wrap justify-center items-center gap-10 mt-10 mb-15">
                    {vehicules.map((v)=>{
                        return(
                            <AdminVehiculeCard
                            key={v._id}
                            vehicule={v}
                            />
                        )
                    })}
                 </div>
                 } 
    
            </section>
        );
}

export default memo(AdminVehicules);