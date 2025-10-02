
import { memo, useState } from "react";
import type { Reservation } from "../../Contexts/Types";
import { useReservationContext } from "../../Contexts/ReservationContext";


const AdminReservationCard = ({reservation} : {reservation : Reservation}) => {

    const [update, setUpdate] = useState<boolean>(false);
    const [status, setStatus] = useState<string>(reservation.status);
    const {updateReservationStatus} = useReservationContext();
    

    return(
        <div className="flex flex-col gap-1 bg-gray-200 p-5 w-[300px] border-3 border-orange-600 rounded-xl transition-transform duration-300 hover:scale-x-105">
              <p>- Vehicule: <strong>{reservation.vehiculeName}</strong></p>
              <p>- VehiculeId : <strong>{reservation.vehiculeId}</strong></p>
              <p>- User Name : <strong>{reservation.userName}</strong></p>
              <p>- User Id : <strong>{reservation.userId}</strong></p>
              <p>- Phone Number : <strong>{reservation.phoneNumber}</strong></p>
              <p>- Start Date: {<strong>{new Date(reservation.startDate).toLocaleDateString('en-US', {
                        weekday: 'long', // "Thursday"
                        year: 'numeric', // "2025"
                        month: 'long',   // "September"
                        day: 'numeric'   // "25"
                        })}</strong>}</p>

               <p>- End Date: {<strong>{new Date(reservation.endDate).toLocaleDateString('en-US', {
                        weekday: 'long', // "Thursday"
                        year: 'numeric', // "2025"
                        month: 'long',   // "September"
                        day: 'numeric'   // "25"
                        })}</strong>}</p>

                <p>- Total Price : <strong>{reservation.totalPrice} Dzd</strong></p>
                <p>- Status : <strong>{reservation.status}</strong></p>

                <button
                disabled={update}
                onClick={()=>{
                     setUpdate(prev => !prev);
                }} 
                className="bg-orange-600 text-white py-2 rounded-lg font-bold cursor-pointer transition-opacity duration-200 hover:opacity-70 active:opacity-50 mb-5 mt-5"
                >
                    {update ? "Updating" : "Update Status"}
                </button>

                 {update &&

                  <div className="flex flex-row justify-center items-center gap-2">
                   <select name="status" 
                   id="" onChange={(e)=>setStatus(e.target.value)}
                   className="bg-white px-2 py-2 border border-gray-300 rounded-[5px] cursor-pointer w-[150px]"
                   >
                      <option value="pending">pending</option>
                      <option value="confirmed">confirmed</option>
                      <option value="cancelled">cancelled</option>
                   </select>

                      <button onClick={async()=>{
                        await updateReservationStatus(status, reservation._id);
                        setUpdate(false);
                    }}
                        className="bg-black text-white px-2 py-1 rounded-[5px] font-bold cursor-pointer transition-opacity duration-300 hover:opacity-70 active:opacity-50"
                        >
                          Update
                      </button>
                   </div>

                 }
        </div>
    )
}

export default memo(AdminReservationCard);