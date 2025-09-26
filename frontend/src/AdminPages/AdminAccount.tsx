import { memo } from "react";
import { useAuthContext } from "../Contexts/AuthContext"


const AdminAccount = () => {

    const {currentUser, signOut} = useAuthContext();
    return(
        <section className="flex flex-col items-center w-full min-h-screen">

            

                <div className="flex flex-col justify-center items-center">
                     <h1 className="text-[1.5em] font-black mt-7 text-center">Welcom Back {currentUser?.name}</h1>

                     <div className="flex flex-col mt-5">
                          <h2 className="text-[1.3em] font-bold text-center">User Info</h2>
                          <p className="mt-3">Name : <span className="font-bold">{currentUser?.name}</span></p>
                          <p>Email : {currentUser?.email}</p>
                          <p>Role : {currentUser?.role}</p>
                          
                     </div>
                     <button className="bg-orange-500 w-[100px] mt-5 text-white py-1 font-bold rounded-full shadow-2xl cursor-pointer transition-all duration-200 border border-orange-500 hover:bg-white hover:text-orange-500 active:opacity-70"
                     onClick={signOut}
                     >Sign Out</button>

                </div>

        </section>
    )
}

export default memo(AdminAccount);