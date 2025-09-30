import { memo, useState, useEffect } from "react"
import { useAuthContext } from "../Contexts/AuthContext";
import { useUsersContext } from "../Contexts/UsersContext";
import { useReservationContext } from "../Contexts/ReservationContext";
import { useRequestContext } from "../Contexts/RequestContext";
import { useVehiculesContext } from "../Contexts/VehiculesContext";
import AdminVehiculeCard from "../AdminComponents/AdminVehicule/AdminVehiculeCard";
import AdminReservationCard from "../AdminComponents/ReservationsComponents/AdminReservationCard";
import RequestAdminComponent from "../AdminComponents/ReservationsComponents/RequestAdminComponent";



function CurrentTime() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000); // met à jour chaque seconde

    return () => clearInterval(timer); // nettoyage quand le composant se démonte
  }, []);

  return (
    <div className="text-xl font-bold text-gray-800">
      {time.toLocaleTimeString("fr-FR", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
      })}
    </div>
  );
}

const Dashboard = () => {

    const today = new Date();
    const {currentUser} = useAuthContext();
    const {users} = useUsersContext();
    const {vehicules} = useVehiculesContext();
    const {allReservations} = useReservationContext();
    const {requests} = useRequestContext();
    const {rented} = useVehiculesContext();
    const {unChechedRequests} = useRequestContext();
    const {unCheckedReservations} = useReservationContext();
    return(
        <section className="min-h-screen flex flex-col w-full items-center">
             <h1 className="text-[2em] font-black mt-7">Dashboard</h1>

             <div className="flex flex-row items-center mt-8 gap-5 justify-center border border-gray-800 py-1 px-3 rounded-3xl">
               <p className="text-gray-800 font-bold">{today.toDateString()}</p>
               <CurrentTime/>
            </div>

             <p className="w-[300px] text-center mt-5 mb-10 text-orange-600 font-bold">
                Welcome Back, {currentUser?.name} browse to see the state of your plateforme today
             </p>

            <div className="w-full flex flex-col items-center bg-black text-white py-12" id="general">

               <h1 className="font-black text-[2em]">General Statistics</h1>

               <div className="flex flex-col items-center text-[1.1em] gap-1 mt-5">
                  <p>Total Number of Users : {users.length}</p>
                  <p>Total Number of Reservations : {allReservations.length}</p>
                  <p>Total number of requests : {requests.length}</p>
                  <p>Total Number of vehicules : {vehicules.length}</p>

               </div>
            </div>

            <div className="w-full py-10 flex flex-col items-center bg-orange-600" id="rented">
                <h1 className="text-[2em] font-black text-center text-white">Rented Vehicules</h1>

                <div className="flex flex-wrap justify-center items-center gap-10 mb-10 mt-10">
                    {rented.map((v)=>{
                        return(
                            <AdminVehiculeCard
                            vehicule={v}
                            key={v._id}
                            />
                        )
                    })}
                </div>
            </div>

            <div className="w-full py-10 flex flex-col items-center justify-center" id="reservations">

                <h1 className="text-[2em] font-black text-center text-black">UnChecked Reservations</h1>

                <div className="flex flex-wrap justify-center items-center gap-10 mb-10 mt-10">
                    {unCheckedReservations.map((r)=>{
                        return(
                            <AdminReservationCard
                            reservation={r}
                            key={r._id}
                            />
                        )
                    })}
                </div>

            </div>

                        <div className="w-full py-10 flex flex-col items-center justify-center bg-black" id="requests">

                <h1 className="text-[2em] font-black text-center text-white">UnChecked Requests</h1>

                <div className="flex flex-wrap justify-center items-center gap-10 mb-10 mt-10">
                    {unChechedRequests.map((r)=>{
                        return(
                            <RequestAdminComponent
                            request={r}
                            key={r._id}
                            />
                        )
                    })}
                </div>

            </div>
        </section>
    )

}


export default memo(Dashboard);