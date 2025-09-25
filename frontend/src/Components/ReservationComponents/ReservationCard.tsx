import { memo, useState } from "react"
import type { Reservation } from "../../Contexts/Types"
import CancelPop from "./CancelPop";



const ReservationCard = ({reservation} : {reservation : Reservation}) => {

   

    const [showPop, setShowPop] = useState<boolean>(false);

    return(
         <>
            <div className="flex flex-col gap-1 p-3 bg-gray-100 border-2 border-black rounded-lg w-[300px] h-[380px]">
                
                <p>
                    Vehicule: <strong>{reservation.vehiculeName}.</strong>
                </p>

                <p className="leading-5">
                    Start Date: <strong>{new Date(reservation.startDate).toLocaleDateString('en-US', {
                        weekday: 'long', // "Thursday"
                        year: 'numeric', // "2025"
                        month: 'long',   // "September"
                        day: 'numeric'   // "25"
                        })}</strong>.
                </p>
                <p className="leading-5">End Date: <strong>{new Date(reservation.endDate).toLocaleDateString('en-US', {
                        weekday: 'long', // "Thursday"
                        year: 'numeric', // "2025"
                        month: 'long',   // "September"
                        day: 'numeric'   // "25"
                        })}</strong>.</p>
                

                
                <p>Phone Number: <strong>{reservation.phoneNumber}</strong>.</p>

                <p>Total Price: <strong>{reservation.totalPrice}</strong>.</p>

                <p>Status: <strong>{reservation.status}</strong>.</p>

                <p className="text-center mt-2 text-[15px] leading-5 text-gray-700">Our experts will contact You Soon , to program the delivery of your car at your convenience</p>

                <div className="w-full flex justify-center items-center mt-3">
                    <button 
                    className="bg-orange-600 text-white px-3 py-2 font-bold rounded-full cursor-pointer transition-opacity duration-200 hover:opacity-70 active:opacity-50"
                    onClick={()=>setShowPop(true)}
                    >Cancel Reservation</button>
                </div>
                
            </div>

            {
                showPop
                  &&
                   <CancelPop
                   setShowPop={setShowPop}
                   reservationId={reservation._id}
                   />
            }
        
        </>
    )
}


export default memo(ReservationCard);