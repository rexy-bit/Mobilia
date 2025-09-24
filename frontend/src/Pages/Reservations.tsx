import { memo } from "react"
import { useReservationContext } from "../Contexts/ReservationContext";
import ReservationCard from "../Components/ReservationComponents/ReservationCard";



const Reservations = () => {

    const {reservations} = useReservationContext();

    return(
        <section className="min-h-screen flex flex-col items-center w-full">

            <h1 className="text-[2em] font-bold text-black">My Reservations</h1>

            <div className="flex flex-col justify-center items-center gap-5 mt-10">
               {reservations.map((r)=>{
                return(
                    <ReservationCard
                        reservation={r}
                        key={r._id}
                    />
                )
               })}
            </div>

        </section>
    )

}

export default memo(Reservations);