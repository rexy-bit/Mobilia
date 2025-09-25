import { memo, useState } from "react";
import { useReservationContext } from "../../Contexts/ReservationContext";


const CancelPop = ({setShowPop, reservationId} : {setShowPop : (b : boolean)=>void, reservationId : string}) => {

    const [isResetting, setIsResetting] = useState<boolean>(false);
    const {cancelReservation} = useReservationContext();

    return(
        <div onClick={()=>setShowPop(false)} className="fixed inset-0 bg-black/40  flex justify-center items-center z-50">

           <div className="flex flex-col items-center w-[700px] h-[350px] bg-white text-black rounded-2xl relative max-[1025px]:w-[400px] max-[450px]:w-[300px] border-4 border-black" onClick={(e) => e.stopPropagation()}>
               <h1 className="text-[1.5em] font-bold mt-17 max-[1025px]:text-[1.2em] max-[1025px]:text-center max-[1025px]:w-[230px]">
                  Are you sure you want to cancel your reservation?
               </h1>
            <div className="flex items-center h-[30px] mt-5">
                {isResetting &&
              <div className="flex justify-center items-center">
                    <i className="fa-solid fa-car-side fa-spin text-[2.5em]"></i>
                </div>
               }
                </div>

               <div className="flex flex-row gap-5 mt-7">
                <button onClick={async()=>{
                    setIsResetting(true);
                   await cancelReservation(reservationId);
                    setShowPop(false);
                    setIsResetting(false);
                }} 
                className="bg-orange-500 w-[110px] h-[40px] rounded-lg text-white font-bold cursor-pointer transition-opacity duration-200 hover:opacity-70 active:opacity-50">Yes, cancel</button>
                <button onClick={()=>{
                    setShowPop(false);
                }} className="h-[40px] w-[90px] border bg-gray-200 border-gray-200 rounded-lg font-bold cursor-pointer transition-opacity duration-200 hover:opacity-70 active:opacity-50">No</button>
               </div>

               <button className="absolute top-1 right-3 font-bold text-[2em] cursor-pointer transition-opacity duration-200 hover:opacity-70 active:opacity-50" onClick={()=> setShowPop(false)}>&times;</button>
           </div>

        </div>
    )
}

export default memo(CancelPop);