import { memo, useState } from "react"
import type { Request } from "../../Contexts/Types"
import { useRequestContext } from "../../Contexts/RequestContext";

const RequestAdminComponent = ({request} : {request : Request}) => {

    const [update, setUpdate] = useState<boolean>(false);
    const [status, setStatus] = useState(request.status);
    const {updateRequestStatus} = useRequestContext();

    return(
        <div className="flex flex-col gap-1 bg-gray-200 p-5 w-[300px] border-3 border-orange-600 rounded-xl transition-transform duration-300 hover:scale-x-105 h-[350px]">
            <p>- Name : <strong>{request.name}</strong></p>
            <p>- Email : <strong>{request.email}</strong></p>
            <p>- Organization : <strong>{request.organization}</strong></p>
            <p>- Phone Number : <strong>{request.phoneNumber}</strong></p>
            <p>- description : {request.description}</p>
            
            <p>- Submited on : {<strong>{new Date(request.createdAt).toLocaleDateString('en-US', {
                        weekday: 'long', // "Thursday"
                        year: 'numeric', // "2025"
                        month: 'long',   // "September"
                        day: 'numeric'   // "25"
                        })}</strong>}</p>

            <div className="w-full flex flex-row items-center justify-between mt-2">
                <p>- Status : <strong>{request.status}</strong></p>
                <button 
                onClick={()=>setUpdate(prev => !prev)}
                    className="bg-orange-600 px-2 py-1 rounded-lg text-[0.9em] text-white font-bold cursor-pointer transition-opacity duration-200 hover:opacity-70 active:opacity-50"
                    >Update Status</button>
            </div>


            {update &&
            
              <div className="flex flex-row items-center gap-2 mt-5">
                 <select name="status" 
                   id="" onChange={(e)=>setStatus(e.target.value)}
                   className="bg-white px-2 py-2 border border-gray-300 rounded-[5px] cursor-pointer w-[150px]"
                   >
                      <option value="new">new</option>
                      <option value="pending">pending</option>
                      <option value="confirmed">confirmed</option>
                   </select>

                    <button onClick={async()=>{
                        await updateRequestStatus(status, request._id);
                        setUpdate(false);
                    }}
                    className="bg-black text-white font-bold text-[14px] px-2 py-2 rounded-lg cursor-pointer transition-opacity duration-200 hover:opacity-70 active:opacity-50"
                    >
                        Update
                    </button>
                </div>
            }
        </div>
    )

}


export default memo(RequestAdminComponent);