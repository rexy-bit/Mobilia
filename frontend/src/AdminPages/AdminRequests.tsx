import { memo } from "react"
import { useRequestContext } from "../Contexts/RequestContext";
import RequestAdminComponent from "../AdminComponents/ReservationsComponents/RequestAdminComponent";


const AdminRequests = () => {

    const {requests, loadingRequests, requestsSearch, searchRequest} = useRequestContext();

    const handleSubmit = async(e : React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();

        const form = e.currentTarget;
        const formData = new FormData(form);

        const search = formData.get("search") as string;

        if(!search || search.trim() === ""){
            return;
        }

        await searchRequest(search);

    }


    return (
        <section className="min-h-screen flex flex-col items-center w-full">
            <h1 className="mt-8 text-[2em] font-black">Requests</h1>

                         <form className="relative mt-5" onSubmit={handleSubmit}>
                <input 
                type="search" 
                name="search"
                 placeholder="vehiculeName, vehiculeId, user name, userId,..."
                                   className="w-[500px] border border-gray-400 px-3 h-[40px] rounded-3xl p-3 pr-17 resize-none focus:outline-none focus:ring-2 focus:ring-orange-400 bg-gray-100 max-[550px]:w-[300px]"
                />

                   <button type="submit" className="absolute right-3 top-1/2 transform -translate-y-1/2  text-white cursor-pointer transiton-opacity duration-200 hover:opacity-70 active:opacity-50"><i className="fa-solid fa-magnifying-glass text-orange-600 text-[1.2em]"></i></button>
             </form>

            {
                loadingRequests ?
                     <div className="mt-10">
                      <i className="fa-solid fa-car-side fa-spin text-[2.5em]"></i>
                   </div>
                : 
                  requestsSearch ?
                    requestsSearch.length === 0 ?
                     <div className="font-bold mt-5">
                        Not requests
                     </div>
                     :
                     <div className="flex flex-wrap justify-center items-center gap-10 mt-10 mb-15">
                    {
                        requestsSearch.map((r)=>{
                            return(
                               <RequestAdminComponent
                               request={r}
                               key={r._id}
                               />
                            )
                        })
                    }
                 </div>
                 :
                      
                 <div className="flex flex-wrap justify-center items-center gap-10 mt-10 mb-15">
                    {
                        requests.map((r)=>{
                            return(
                               <RequestAdminComponent
                               request={r}
                               key={r._id}
                               />
                            )
                        })
                    }
                 </div>
            }
        </section>
    )
}

export default memo(AdminRequests);