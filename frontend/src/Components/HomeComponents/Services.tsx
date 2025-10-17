import { memo } from "react"
import { useNavigate } from "react-router-dom"


const services = [
    {
        name : "Wide Vehicle Selection",
        description : "Discover a diverse fleet of cars, SUVs, and premium vehicles ,carefully chosen to match every lifestyle",
        emoji : "https://res.cloudinary.com/dub4fhabm/image/upload/v1759691272/car_1_am4qru.png"
    },
    {
        name : "Seamless Online Booking",
        description : "Enjoy a smooth reservation experience with just a few clicks, anytime, anywhere, from any device.",
        emoji : "https://res.cloudinary.com/dub4fhabm/image/upload/v1759691335/booking_jkgrot.png"
    },
    {
        name : "Affordable & Transparent Pricing",
        description : "Get the best value with clear, upfront rates, no hidden fees, no surprises, only fair deals.",
        emoji : "https://res.cloudinary.com/dub4fhabm/image/upload/v1759691420/funding_je77ic.png"
    },
    {
        name : "24/7 Customer Support",
        description : "Rely on our dedicated support team, available around the clock to guide and assist you whenever you need.",
        emoji : "https://res.cloudinary.com/dub4fhabm/image/upload/v1759691547/24-hours-support_nzwp7a.png"
    }
]
const Services = () => {


    const navigate = useNavigate();

    
    return(
        <section className="flex flex-col items-center py-10 bg-orange-600 w-full" id="services">
            <h1 className="text-white font-bold text-[3em] font-sans">Our Services</h1>

             <div className="flex flex-wrap gap-10 items-center mt-10 mb-5 justify-center px-10">
                {services.map((s)=>{
                    return(
                        <div key={s.name} className="w-[250px] p-5 bg-gray-50 rounded-lg border-3 border-black flex flex-col items-center h-[300px] relative cursor-pointer transition-transform duration-300 hover:scale-105">
                            <h1 className="absolute top-3 text-[1.2em] text-center font-black">{s.name}</h1>
                            <img src={s.emoji} alt={s.name} className="w-25 mt-[55px]"/>
                            <div className="absolute bottom-2 text-center text-gray-900">
                                {s.description}
                            </div>
                        </div>
                    )
                })}
             </div>

             <div className="flex flex-row justify-center items-center gap-5 mt-7 mb-5 max-[510px]:flex-col">
                <button className="px-5 bg-gray-100 font-bold text-[15px] py-2 rounded-lg cursor-pointer transition-all duration-200 hover:bg-gray-300 active:scale-95" onClick={()=>navigate("/vehicules")}>
                    View Available Vehicules
                </button>

                <button className="px-5 bg-black text-white font-bold text-[15px] py-2 rounded-lg cursor-pointer transition-all duration-200 hover:bg-gray-900 active:scale-95" onClick={()=>navigate("/guide")}>
                    Make a Personalized Booking
                </button>
             </div>
        </section>
    )
}

export default memo(Services);