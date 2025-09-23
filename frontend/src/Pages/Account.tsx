import { memo, useEffect, useState } from "react"
import { useAuthContext } from "../Contexts/AuthContext";
import SignIn from "../Components/AccountComponents/SignIn";
import SignUp from "../Components/AccountComponents/SignUp";


const Account = () => {

    const {currentUser, signOut} = useAuthContext();

    const [activeForm, setActiveForm] = useState<"signIn" | "signUp">(()=>{
        const saved = localStorage.getItem('activeForm');

        return saved ? JSON.parse(saved) : "signIn";
    });

    useEffect(()=>{
        localStorage.setItem('activeForm', JSON.stringify(activeForm));
    }, [activeForm]);

    return(
        <section className="min-h-screen flex flex-col items-center">
           
           {currentUser === null
               ?
               <div className="mt-10 flex flex-col items-center ">
                  <h1 className="text-balck text-[1.5em] font-black">Sign In/Up Forms</h1>
                <div className="flex flex-col items-center mt-5">
                    <div className="flex flex-row justify-center items-center gap-0 h-[50px]">
                        <div className="w-[200px] h-full flex justify-center items-center border-b-3 text-black text-[1.2em] cursor-pointer max-[450px]:w-[150px]" style={{borderBottomColor : activeForm === "signIn" ? "orange" : "lightgray",
                            fontWeight : activeForm === "signIn" ? "900" : "400"
                        }
                                } onClick={()=>setActiveForm("signIn")}>
                            Sign In
                        </div>
                        <div className="w-[200px] h-full flex justify-center items-center border-b-3 text-black text-[1.2em] cursor-pointer max-[450px]:w-[150px]" style={{borderBottomColor : activeForm === "signUp" ? "orange" : "lightgray",
                            fontWeight : activeForm === "signUp" ? "900" : "400"
                        }} onClick={(()=>setActiveForm("signUp"))}>
                           Sign Up
                        </div>
                    </div>

                     {activeForm === "signIn" ?
                        <SignIn/>
                        :
                          <SignUp/>  
                    }
                </div>
                
                  
                </div>
                :
                <div className="flex flex-col justify-center items-center">
                     <h1 className="text-[1.5em] font-black mt-7 text-center">Welcom Back {currentUser.name}</h1>

                     <div className="flex flex-col mt-5">
                          <h2 className="text-[1.3em] font-bold text-center">User Info</h2>
                          <p className="mt-3">Name : <span className="font-bold">{currentUser.name}</span></p>
                          <p>Email : {currentUser.email}</p>
                          
                     </div>
                     <button className="bg-orange-500 w-[100px] mt-5 text-white py-1 font-bold rounded-full shadow-2xl cursor-pointer transition-all duration-200 border border-orange-500 hover:bg-white hover:text-orange-500 active:opacity-70"
                     onClick={signOut}
                     >Sign Out</button>

                </div>
           }
        </section>
    )
}

export default memo(Account);