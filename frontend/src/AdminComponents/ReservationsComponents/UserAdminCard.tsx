
import { memo, useState } from "react";
import type { User } from "../../Contexts/Types";
import { useUsersContext } from "../../Contexts/UsersContext";
import DeleteUserPop from "./DeleteUserPop";



const UserAdminCard = ({user} : {user : User}) => {

    const [update, setUpdate] = useState<boolean>(false);
    const [role, setRole] = useState<string>(user.role)
    const {updateUserRole} = useUsersContext();
    const [showPop, setShowPop] = useState<boolean>(false)


    return(
        <>

        <div className="flex flex-col gap-1 bg-gray-200 p-5 w-[300px] border-3 border-orange-600 rounded-xl transition-transform duration-300 hover:scale-x-105 h-[300px]">
            <p>- Name: <strong>{user.name}</strong></p>
            <p>- Email: <strong>{user.email}</strong></p>
            
            <p>- Created At: {<strong>{new Date(user.createdAt).toLocaleDateString('en-US', {
                        weekday: 'long', // "Thursday"
                        year: 'numeric', // "2025"
                        month: 'long',   // "September"
                        day: 'numeric'   // "25"
                        })}</strong>}</p>


            <div className="flex flex-row w-full items-center justify-between">
                <p>- Role: <strong>{user.role}</strong></p>
                <button
                 onClick={()=>setUpdate(prev => !prev)}
                    className="bg-orange-600 px-2 py-1 rounded-lg text-[0.9em] text-white font-bold cursor-pointer transition-opacity duration-200 hover:opacity-70 active:opacity-50"
                >Update Role</button>
            </div>

            <button className="bg-red-600 text-white w-[100px] py-1 font-bold rounded-xl cursor-pointer transition-opacity duration-200 hover:opacity-70 active:opacity-50"
            onClick={()=>setShowPop(true)}
            >
                Delete
            </button>

           {update &&
             
               <div className="flex flex-row items-center gap-2 mt-5">
                 <select name="status" 
                   id="" 
                   onChange={(e)=>setRole(e.target.value)}
                   className="bg-white px-2 py-2 border border-gray-300 rounded-[5px] cursor-pointer w-[150px]"
                   >
                      <option value="user">user</option>
                      <option value="admin">admin</option>
                     
                   </select>

                    <button onClick={async()=>{
                        await updateUserRole(role, user._id);
                        setUpdate(false);
                    }}
                    className="bg-black text-white font-bold text-[14px] px-2 py-2 rounded-lg cursor-pointer transition-opacity duration-200 hover:opacity-70 active:opacity-50"
                    >
                        Update
                    </button>
                </div>
           }
            
        </div>

        {showPop &&
            <DeleteUserPop
            setShowPop={setShowPop}
            userId={user._id}
            />
        }
        </>
    )

}


export default memo(UserAdminCard);