import { memo } from "react"
import type { Reservation } from "../../Contexts/Types"


const ReservationCard = ({reservation} : {reservation : Reservation}) => {

    return(
       
            <div className="flex flex-col gap-1 p-3 bg-gray-100 border-2 border-black rounded-lg w-[300px]">
                
                <p>
                    Vehicule: <strong>{reservation.vehiculeName}.</strong>
                </p>

                <p>
                    Start Date: <strong>{new Date(reservation.startDate).toLocaleDateString('en-US', {
                        weekday: 'long', // "Thursday"
                        year: 'numeric', // "2025"
                        month: 'long',   // "September"
                        day: 'numeric'   // "25"
                        })}</strong>.
                </p>
                <p>End Date: <strong>{new Date(reservation.endDate).toLocaleDateString('en-US', {
                        weekday: 'long', // "Thursday"
                        year: 'numeric', // "2025"
                        month: 'long',   // "September"
                        day: 'numeric'   // "25"
                        })}</strong>.</p>
                

                
                <p>Phone Number: <strong>{reservation.phoneNumber}</strong>.</p>

                <p>Total Price: <strong>{reservation.totalPrice}</strong>.</p>

                <p>Status: <strong>{reservation.status}</strong>.</p>
                
            </div>
        
    )
}


export default memo(ReservationCard);