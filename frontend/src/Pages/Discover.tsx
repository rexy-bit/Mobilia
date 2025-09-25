import { useNavigate, useParams } from "react-router-dom";
import { useVehiculesContext } from "../Contexts/VehiculesContext"
import { memo, useEffect, useState } from "react";


const Discover = () => {

    const {vehiculeDetails, getVehicule, loadingVehicules} = useVehiculesContext();
    const {id} = useParams();
    const [currentImage, setCurrentImage] = useState<number>(0);
    const navigate = useNavigate();
  

    const getNextSlide = () => {
        if(!vehiculeDetails) return;
         if(currentImage === (vehiculeDetails?.images.length - 1)){
            setCurrentImage(0);
         }else{
            setCurrentImage(prev => prev +1);
         }
    }

    const getPrevSlide = () => {

        if(!vehiculeDetails) return;

        if(currentImage === 0){
            setCurrentImage(vehiculeDetails.images.length - 1);
        }else{
            setCurrentImage(prev => prev - 1);
        }

    }

    useEffect(()=>{
        getVehicule(id);
    }, [id]);

    return(
        <section className="min-h-screen flex flex-col items-center w-full relative">

           {loadingVehicules ?
                <div className="mt-20">
                  <i className="fa-solid fa-car-side fa-spin text-[2.5em]"></i>
               </div>
               : 
                  !vehiculeDetails ?

                      <div className="mt-10">Vehicule Not found</div>
                      :
                        <div className="flex flex-col items-center w-full">

                          <div className="flex flex-col items-center w-full">
                            <div className="flex flex-row justify-center items-center gap-5 mt-5">
                                <button className="text-[3em] font-black cursor-pointer transition-all duration-200 hover:opacity-70 active:opacity-50" onClick={getPrevSlide}>&#10094;</button>

                                <img
                                key={currentImage}
                                src={vehiculeDetails.images[currentImage]} alt={vehiculeDetails.model} className="w-[700px] h-[500px] object-contain transition-opacity duration-700 ease-in-out opacity-100 max-[900px]:w-[400px] max-[900px]:h-[300px] max-[600px]:w-[250px] max-[600px]:h-[200px]"/>

                                <button className="text-[3em] font-black cursor-pointer transition-all duration-200 hover:opacity-70 active:opacity-50" onClick={getNextSlide}>&#10095;</button>
                            </div>

                            <p className="text-[1.3em] font-bold">{currentImage +1 } / {vehiculeDetails.images.length}</p>
                          </div>

                    <div className="flex flex-row w-full px-40 py-15 bg-black text-white mt-20 justify-between items-center max-[1100px]:px-0 max-[1100px]:flex-col max-[1100px]:justify-center max-[1100px]:gap-10">

                               <div className="max-[1100px]:flex max-[1100px]:flex-col max-[1100px]:items-center">
                                  <h1 className="font-sans font-black text-[3em] max-[1200px]:text-[2.5em] max-[1100px]:text-[2em]">{vehiculeDetails.brand.toUpperCase()} {vehiculeDetails.model.toUpperCase()}</h1>
                                  <p className="text-[1.5em] text-orange-600 font-bold">{vehiculeDetails.category.toUpperCase()} {vehiculeDetails.fuelType.toUpperCase()} {vehiculeDetails.transmission.toUpperCase()}</p>
                                  <p className="font-black text-[1.4em]">Year: {vehiculeDetails.year}</p>

                <div className="flex flex-row items-center gap-3 mt-5">
                <div className="flex flex-row justify-center items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-users-icon lucide-users"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><path d="M16 3.128a4 4 0 0 1 0 7.744"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><circle cx="9" cy="7" r="4"/></svg>

                    <p className="text-[0.9em]">{vehiculeDetails.seats} seats</p>
                </div>

                <p className="text-[14px]">Category: <span className="font-bold">{vehiculeDetails.category}</span></p>

                <div className="flex flex-row gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-fuel-icon lucide-fuel"><path d="M14 13h2a2 2 0 0 1 2 2v2a2 2 0 0 0 4 0v-6.998a2 2 0 0 0-.59-1.42L18 5"/><path d="M14 21V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v16"/><path d="M2 21h13"/><path d="M3 9h11"/></svg>

                    <p className="font-bold text-[14px]">{vehiculeDetails.fuelType}</p>
                </div>

                


            </div>

                               </div>

                                  <div className="flex flex-col justify-center items-center gap-5">
                                <p className="text-[1.7em] font-bold max-[400px]:text-[1.5em]">Starts from <span className="text-orange-600">{vehiculeDetails.priceDay} Dzd</span>/Day</p>

                                <button className="bg-orange-600 px-4 py-3 rounded-full font-bold cursor-pointer transition-opacity duration-300 hover:opacity-70 active:opacity-50"
                                onClick={()=>navigate(`/reservation/${vehiculeDetails._id}`)}
                                >
                                    Reserve &#10095;
                                </button>
                            </div>
                               
                            </div>

                           <div className="flex flex-col gap-1 mt-10 w-[900px] mb-10 max-[950px]:w-[500px] max-[550px]:w-[300px]">
                              <p className="text-[1.3em] font-bold">Description:</p>
                              <p className="text-[16px] text-gray-800">{vehiculeDetails.description}</p>
                           </div>
                            

                        </div>
            }

            <button
            className="bg-white text-black font-bold absolute top-2 left-2 px-3 py-1 border-2 border-black rounded-full cursor-pointer transition-all duration-300 hover:bg-gray-100 active:bg-gray-200"
            onClick={()=>navigate(-1)}
            >&#8592; Back</button>

        </section>
    )
}

export default memo(Discover);