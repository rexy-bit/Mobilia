import { memo, useState } from "react";
import type { Vehicule } from "../../Contexts/Types";
import { useNavigate } from "react-router-dom";
import DeleteVehiculePop from "./DeleteVehiculePop";


const AdminVehiculeCard = ({vehicule} : {vehicule : Vehicule}) => {

    const navigate = useNavigate();

    const [showPop, setShowPop] = useState<boolean>(false);

    return(
        <>

        <div className="flex flex-col items-center border-[2px] border-gray-300 rounded-lg w-[300px] h-[410px] shadow-xl bg-white">
            <h1 className="text-black font-bold text-[1.3em] mt-2">{vehicule.brand} {vehicule.model}</h1>

            <img src={vehicule.images[0]} alt={vehicule.model} className="h-[150px] w-[150px] object-contain "/>

             {vehicule.available ?
               <div className="flex flex-row gap-0 h-[37px] items-center justify-center border border-green-600">
                  <div className="bg-green-600 h-full flex items-center w-[40px] justify-center"><i className="fa-solid fa-check text-white text-[18px]"></i></div>
                   <div className="text-green-600 w-[100px] flex items-center justify-center font-bold">Available</div>
               </div>
                : 
                <div className="flex flex-row gap-0 h-[37px] items-center justify-center border border-orange-400">
                    <div className="bg-orange-400 h-full flex items-center w-[40px] justify-center"><i className="fa-regular fa-clock text-white"></i></div>
                   <div className="text-orange-400 w-[100px] flex items-center justify-center font-bold">Reserved</div>
                </div> 
              }
            
            <div className="flex flex-row items-center gap-3 mt-5">
                <div className="flex flex-row justify-center items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-users-icon lucide-users"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><path d="M16 3.128a4 4 0 0 1 0 7.744"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><circle cx="9" cy="7" r="4"/></svg>

                    <p className="text-[0.9em]">{vehicule.seats} seats</p>
                </div>

                <p className="text-[14px]">Category: <span className="font-bold">{vehicule.category}</span></p>

                <div className="flex flex-row gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-fuel-icon lucide-fuel"><path d="M14 13h2a2 2 0 0 1 2 2v2a2 2 0 0 0 4 0v-6.998a2 2 0 0 0-.59-1.42L18 5"/><path d="M14 21V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v16"/><path d="M2 21h13"/><path d="M3 9h11"/></svg>

                    <p className="font-bold text-[14px]">{vehicule.fuelType}</p>
                </div>

                


            </div>

               <p className="text-[1.2em] mt-3">Starts from <span className="font-bold text-orange-600">{vehicule.priceDay} Dzd/Day</span></p>

            
                 <div className="flex flex-row justify-center items-center gap-5 mt-5 mb-5">
                    <button className="bg-white text-black border border-black w-[110px] py-2 rounded-full cursor-pointer transition-all duration-200 hover:bg-gray-100 active:bg-gray-200" onClick={()=>navigate(`/admin/update/${vehicule._id}`)}>Details</button>
                    
                    <button className="py-2 rounded-full w-[110px] text-white font-bold cursor-pointer transition-all duration-200 bg-red-600 border border-red-600 hover:opacity-80 active:opacity-60" onClick={()=>setShowPop(true)}>
                        Delete
                    </button>
                    
                 </div>

        </div>

        {showPop &&
        <DeleteVehiculePop 
        setShowPop={setShowPop}
        vehiculeId={vehicule._id}
          
        />
         }
        </>
    )
    
}


export default memo(AdminVehiculeCard);