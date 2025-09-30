import  { memo, useState } from "react"
import { useReservationContext } from "../Contexts/ReservationContext";
import AdminReservationCard from "../AdminComponents/ReservationsComponents/AdminReservationCard";



const AdminReservations = () => {

    const {allReservations, loadingReservations, searchReservation, searchReservations} = useReservationContext();
    

    const handleSubmit = async(e : React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();

        const form = e.currentTarget;

        const formData = new FormData(form);

        const searchInput = formData.get("search") as string;

        if(!searchInput || searchInput.trim() === ""){

            return;
        }

        await searchReservation(searchInput);

    }

    return(
        <section className="flex flex-col items-center min-h-screen w-full">
            <h1 className="mt-7 font-black text-[2.2em] text-black underline">Reservations</h1>



             <form className="relative mt-5" onSubmit={handleSubmit}>
                <input 
                type="search" 
                name="search"
                 placeholder="vehiculeName, vehiculeId, user name, userId,..."
                                   className="w-[500px] border border-gray-400 px-3 h-[40px] rounded-3xl p-3 pr-17 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-100 max-[550px]:w-[300px]"
                />

                   <button type="submit" className="absolute right-3 top-1/2 transform -translate-y-1/2  text-white cursor-pointer transiton-opacity duration-200 hover:opacity-70 active:opacity-50"><i className="fa-solid fa-magnifying-glass text-orange-600 text-[1.2em]"></i></button>
             </form>

            {loadingReservations ?
                
                                   <div className="mt-10">
                      <i className="fa-solid fa-car-side fa-spin text-[2.5em]"></i>
                   </div>
                   :
                     searchReservations ? 
                       searchReservations.length === 0 ?
                        <div className="font-bold top-5">
                            Not found
                        </div>
                        :
                       <div className="w-full flex flex-wrap gap-10 justify-center items-center mt-10 mb-15">
                            {searchReservations.map((r)=>{
                    return(
                        <AdminReservationCard
                        key={r._id}
                        reservation={r}
                        />
                    )
                       })}
                       </div>
                       :
                    allReservations.length === 0 ?
                      <div className="mt-10 font-bold">
                        No Reservations found
                      </div>
                      :

                      <>
             
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
            </>
            }
        </section>
    )
}

export default memo(AdminReservations);