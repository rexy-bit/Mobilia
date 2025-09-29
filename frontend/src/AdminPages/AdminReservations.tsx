import  { memo } from "react"
import { useReservationContext } from "../Contexts/ReservationContext";
import AdminReservationCard from "../AdminComponents/ReservationsComponents/AdminReservationCard";



const AdminReservations = () => {

    const {allReservations} = useReservationContext();

    return(
        <section className="flex flex-col items-center min-h-screen w-full">
            <h1 className="mt-7 font-black text-[2.2em] text-black underline">Reservations</h1>


            <div className="w-full flex flex-wrap gap-10 justify-center items-center mt-10 mb-15">
                {allReservations.map((r)=>{
                    return(
                        <AdminReservationCard
                        key={r._id}
                        reservation={r}
                        />
                    )
                })}
            </div>
        </section>
    )
}

export default memo(AdminReservations);