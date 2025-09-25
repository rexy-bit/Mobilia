import { memo } from "react"
import { useReservationContext } from "../Contexts/ReservationContext";
import ReservationCard from "../Components/ReservationComponents/ReservationCard";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../Contexts/AuthContext";



const Reservations = () => {

    const {reservations} = useReservationContext();
    const {currentUser} = useAuthContext();
    const navigate = useNavigate();

    return(
        <section className="min-h-screen flex flex-col items-center w-full">


            <div className="flex flex-row justify-between items-center w-full bg-orange-500 px-30 py-10 max-[1300px]:px-10 max-[1200px]:px-5 max-[1100px]:flex-col max-[1100px]:gap-10">
                <div className="flex flex-col gap-2 max-[1100px]:items-center">
                    <p className="text-white text-[2.5em] font-sans font-bold max-[1100px]:text-[2em] text-center leading-10">MOBILIA DELIVERY SERVICE</p>
                    <p className="w-[500px] text-[1.2em] text-white max-[1100px]:text-center max-[1000px]:text-[1em] max-[550px]:w-[300px] mt-3">
                At <strong>Mobilia</strong>, we believe car reservations should be simple and stress-free.  
                That’s why we offer our exclusive <strong>home & office delivery service</strong>:  
                your reserved vehicle arrives directly where you need it.  
                Save time, enjoy comfort, and let Mobilia take care of the rest.
                    </p>

                    <p className="font-bold text-gray-200 mt-2 text-[17px] ">
                        For more Information <a href="" className="underline transition-opacity duration-300 hover:opacity-70 active:opacity-50">Contact Us</a>
                    </p>
                </div>

                <div className="flex flex-col items-center gap-5">
                    <img src="https://res.cloudinary.com/dub4fhabm/image/upload/v1758800517/pexels-shkrabaanthony-7144203_xzuxwp.jpg" alt="" className="w-[400px] h-[300px] object-contain max-[450px]:w-[300px] max-[450px]:h-[200px]"/>

                    <button className="bg-black text-white px-5 py-3 rounded-full font-bold cursor-pointer border-2 border-black transition-all duration-300 hover:bg-white hover:text-black active:bg-gray-200"
                    onClick={()=>navigate('/vehicules')}

                    >
                        Reserve With Mobilia
                    </button>
                </div>
            </div>

            {        
                !currentUser ?
                <div>
                    <button className="bg-orange-600 text-white py-2 px-3 rounded-full text-[15px] font-[600] mt-5 transition-opacity duration-200 hover:opacity-70 active:opacity-50 cursor-pointer"
                        onClick={()=>navigate('/account')}>
                    Sign In/Up to Add Reservations
                    </button>
                </div>
                : 
                  reservations.length === 0 ?
                    <div className="flex flex-col items-center mt-10">
                        <p className="font-bold text-[1.7em] text-center">You have no reservations</p>

                        <button className="bg-orange-600 text-white py-2 px-3 rounded-full text-[15px] font-[600] mt-5 transition-opacity duration-200 hover:opacity-70 active:opacity-50 cursor-pointer"
                        onClick={()=>navigate('/vehicules')}
                        >
                            Make Your Reservation
                        </button>
                    </div>
                    :
                    <>
                   

            <h1 className="text-[2em] font-bold text-black mt-10">My Reservations</h1>


            <div className="flex flex-wrap justify-center items-center gap-10 mt-10 mb-10">
               {reservations.map((r)=>{
                return(
                    <ReservationCard
                        reservation={r}
                        key={r._id}
                    />
                )
               })}
            </div>

             </>

            }

        </section>
    )

}

export default memo(Reservations);