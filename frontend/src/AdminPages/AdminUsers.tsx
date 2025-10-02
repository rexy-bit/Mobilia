import { memo } from "react"
import { useUsersContext } from "../Contexts/UsersContext";
import UserAdminCard from "../AdminComponents/ReservationsComponents/UserAdminCard";


const AdminUsers = () => {

     const {loadingUsers, users, searchUser, usersSearch} = useUsersContext();

     const submitForm = async(e : React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();
        const form = e.currentTarget;

        const formData = new FormData(form);

        const search = formData.get("search") as string;

        if(!search || search.trim()===""){
            return;
        }

        await searchUser(search);


     }
    return(
        <section className="min-h-screen flex flex-col items-center">

             <h1 className="text-[2em] font-black mt-5">Users</h1>


            <form className="relative mt-5" onSubmit={submitForm}>
                <input 
                type="search" 
                name="search"
                 placeholder="user name, userId,role,email..."
                 className="w-[500px] border border-gray-400 px-3 h-[40px] rounded-3xl p-3 pr-17 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-100 max-[550px]:w-[300px]"
                />

                   <button type="submit" className="absolute right-3 top-1/2 transform -translate-y-1/2  text-white cursor-pointer transiton-opacity duration-200 hover:opacity-70 active:opacity-50"><i className="fa-solid fa-magnifying-glass text-orange-600 text-[1.2em]"></i></button>
             </form>

             {
                loadingUsers ?
                                                      <div className="mt-10">
                      <i className="fa-solid fa-car-side fa-spin text-[2.5em]"></i>
                   </div>
                   :
                      usersSearch ? 
                        usersSearch.length === 0 ?
                        <div>
                            Users not found
                        </div>
                        : 
                           <div className="flex flex-wrap w-full items-center justify-center gap-10 mt-10">
                    {usersSearch.map((u)=>{
                        return(
                            <UserAdminCard
                            user={u}
                            key={u._id}
                            />
                        )
                    })}
                   </div>:
                   <div className="flex flex-wrap w-full items-center justify-center gap-10 mt-10">
                    {users.map((u)=>{
                        return(
                            <UserAdminCard
                            user={u}
                            key={u._id}
                            />
                        )
                    })}
                   </div>
             }
        </section>
    )
   
}

export default memo(AdminUsers);