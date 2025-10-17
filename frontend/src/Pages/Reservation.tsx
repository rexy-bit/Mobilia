import { useNavigate, useParams } from "react-router-dom"
import { useVehiculesContext } from "../Contexts/VehiculesContext";
import { memo, useEffect, useState } from "react";
import { useAuthContext } from "../Contexts/AuthContext";
import { useReservationContext } from "../Contexts/ReservationContext";
import GeneralFooter from "../Components/HomeComponents/GeneralFooter";
import Copyright from "../Components/HomeComponents/Copyright";


const Reservation = () => {

    const {id} = useParams();
    const {currentUser} = useAuthContext();

    const {getVehicule, vehiculeDetails} = useVehiculesContext();
    const {addReservation} = useReservationContext();
    const navigate = useNavigate();

    const [currentImage, setCurrentImage] = useState<number>(0);

    const getPrevSlide = () => {

        if(!vehiculeDetails) return;
        if(currentImage === 0){
            setCurrentImage(vehiculeDetails.images.length - 1);
        }else{
            setCurrentImage(prev => prev - 1);
        }

    }

    const getNextSlide = () => {

        if(!vehiculeDetails) return;

        if(currentImage === vehiculeDetails.images.length - 1){
            setCurrentImage(0);
        }else{
            setCurrentImage(prev => prev + 1);
        }

    }

    useEffect(()=>{
        getVehicule(id);

    }, [id]);

    useEffect(() => {
  if (vehiculeDetails) {
    setFormData(prev => ({
      ...prev,
      vehiculeId: vehiculeDetails._id,
      vehiculeName: vehiculeDetails.model
    }));
  }
}, [vehiculeDetails]);

        const [formData, setFormData] = useState(
        {
            userId : currentUser?._id,
            userName : currentUser?.name,
            vehiculeId : vehiculeDetails?._id,
            vehiculeName : vehiculeDetails?.model,
            phoneNumber : "",
            startDate : "",
            endDate : "",
            totalPrice : 0,
            status : "pending"
        }
    )

    const handleChange = (e : React.ChangeEvent<HTMLInputElement>) =>{

        const {name, value} = e.target;

        setFormData({
            ...formData,
            [name] :  value
        });
    }

    const handleSubmit = async(e : React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();
        if(!vehiculeDetails?.available) return;

        if(!formData.userName || !formData.userId || formData.userName === "" || formData.userId === "" || !formData.phoneNumber || formData.phoneNumber.trim() ==="" || !formData.endDate || !formData.startDate){
            return;
        }

        await addReservation(formData);
        setFormData({
              userId : currentUser?._id,
            userName : currentUser?.name,
            vehiculeId : vehiculeDetails?._id,
            vehiculeName : vehiculeDetails?.model,
            phoneNumber : "",
            startDate : "",
            endDate : "",
            totalPrice : 0,
            status : "pending"
        });
    }

    return(
        <section className="min-h-screen flex flex-col items-center w-full">

            {!vehiculeDetails ?
            
               <div className="text-[1.2em] font-bold text-center mt-20">Vehicule not found</div>
               : 
                 <div className="flex flex-col items-center w-full">

                   <div className="flex flex-row justify-between items-center w-full px-20 bg-orange-500 py-10 text-white max-[1000px]:px-10 max-[760px]:flex-col max-[760px]:gap-5">
                         <div className="flex flex-col max-[760px]:items-center">
                            <h1 className="text-[2em] font-black max-[1000px]:text-[1.6em] text-center">
                            Reserve The {vehiculeDetails?.brand} {vehiculeDetails?.model} {vehiculeDetails?.year}
                            </h1>

                            <p className="text-[1.3em] font-bold">{vehiculeDetails.category.toUpperCase()} {vehiculeDetails.fuelType.toUpperCase()} {vehiculeDetails.transmission.toUpperCase()}</p>

                                            <div className="flex flex-row items-center gap-3 mt-3">
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

                   <div>
                     <p className="text-[1.5em] font-black max-[1000px]:text-[1.3em]">Starts From {vehiculeDetails.priceDay} Dzd/Day</p>
                   </div>
                   </div>
                   
                    <h1 className="text-[1.6em] font-bold font-sans mt-8">{vehiculeDetails?.brand} {vehiculeDetails?.model} {vehiculeDetails?.year}</h1>

                   <div className="flex flex-row justify-center items-center gap-2">
                    <button
                    className="text-[1.7em] font-bold cursor-pointer transition-opacity duration-200 hover:opacity-70 active:opacity-50"
                    onClick={getPrevSlide}
                    >&#10094;</button>
                    <img src={vehiculeDetails.images[currentImage]} alt={vehiculeDetails.model} className="w-[300px] h-[200px] object-contain max-[400px]:w-[250px]"/>
                    <button
                    className="text-[1.7em] font-bold cursor-pointer transition-opacity duration-200 hover:opacity-70 active:opacity-50"
                    onClick={getNextSlide}
                    >&#10095;</button>
                    </div>

                    {
                        !currentUser ?
                          <div className="mb-20 flex flex-col items-center gap-5">
                            <p className="font-bold mt-5 text-[1.1em]">
                            Sign In or Sign Up to make reservations.
                            </p>

                            <button 
                            onClick={()=>navigate('/account')}
                            className="bg-black text-white font-bold w-[110px] py-2 rounded-full border border-black transition-all duration-300 hover:bg-white hover:text-black cursor-pointer active:opacity-70"
                            >Sign In/Up</button>
                          </div>
                          : 
                    
                    <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center gap-3 mt-10 mb-10">

                        <h1 className="w-[300px] text-center text-[1.2em] font-bold">Please Fill The Form With Correct And Valid Information</h1>

                        <input 
                        type="text" 
                        placeholder="Name..."
                        name="userName"
                        value={formData.userName}
                        onChange={handleChange}
                        required
                        className="bg-gray-100 w-[250px] py-1 px-2  border border-gray-300 rounded-lg focus:ring-2 ring-orange-500 mt-5"
                        />

                        <input 
                        type="tel" 
                        placeholder="Phone Number..."
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        required
                        className="bg-gray-100 w-[250px] py-1 px-2  border border-gray-300 rounded-lg focus:ring-2 ring-orange-500"
                        />

                        <input 
                        type="date" 
                        placeholder="Name..."
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleChange}
                        required
                        className="bg-gray-100 w-[250px] py-1 px-2  border border-gray-300 rounded-lg focus:ring-2 ring-orange-500"
                        />

                        <input 
                        type="date" 
                        placeholder="Name..."
                        name="endDate"
                        value={formData.endDate}
                        onChange={handleChange}
                        required
                        className="bg-gray-100 w-[250px] py-1 px-2  border border-gray-300 rounded-lg focus:ring-2 ring-orange-500"
                        />

                        <button className="w-[110px] bg-black text-white font-bold py-2 rounded-full mt-4 cursor-pointer transition-opacity duration-300 hover:opacity-70 active:opacity-50">Submit</button>

                    </form>
                 }

                 </div>
            }
            
            <GeneralFooter/>
            <Copyright/>

        </section>
    )
}

export default memo(Reservation);