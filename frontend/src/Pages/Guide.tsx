import { memo, useState } from "react"
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import RequestForm from "../Components/ReservationComponents/RequestForm";
import FindUs from "../Components/ReservationComponents/FindUs";


const steps = [
    {
        step : "1- Choose a Vehicle",
        icon : "/icons/cars.png",
        text : "Browse our online catalog and select the vehicle that best suits your needs. You can filter by category, price, comfort, or specific options (automatic transmission, number of seats, etc.)."

    },
    {
        step : "2- Enter Your Information",
        icon : "/icons/utilisateur.png",
        text : "Fill in your personal details (name, surname, email, phone number). This information allows us to confirm your booking and contact you if needed."
    },{
                step : "3- Select the Dates",
        icon : "/icons/calendrier.png",
        text : "Choose your start and end dates. Our system will automatically check the availability of the selected vehicle for those dates."
    },{
                step : "4- Submit the Form",
        icon : "/icons/assignation.png",
        text : "Once all the information is completed, validate your request with a single click. You will receive a provisional confirmation with the details of your booking."
    },{
                step : "5- Wait for Confirmation",
        icon : "/icons/coche.png",
        text : "Our Mobilia team will quickly get in touch to confirm your reservation. You will then have the opportunity to discuss additional services such as home delivery of your vehicle, insurance, or any personalized options."
    }
];

const why = [
    {
        item : "Personalized guidance",
        icon : "https://res.cloudinary.com/dub4fhabm/image/upload/v1758817966/direction_vconyr.png",
        text : "Our team will help you choose the right mix of vehicles for your needs."
    },{
        item : "Custom offers",
        icon : "https://res.cloudinary.com/dub4fhabm/image/upload/v1758818078/etiquette-de-prix_ilvzw5.png",
        text : "Benefit from special packages, flexible delivery, and group discounts."
    },{
        item : "Smooth coordination",
        icon : "https://res.cloudinary.com/dub4fhabm/image/upload/v1758818183/coordination_t55ryq.png",
        text : "We assist you in organizing dates, drivers, and delivery logistics.Benefit from special packages, flexible delivery, and group discounts."
    }
];


const Guide = () =>  {

    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState<number>(0);

    return(

        <section className="flex flex-col min-h-screen items-center w-full">
            
            <div className="w-full flex flex-row justify-between items-center px-10 py-10 bg-gray-950 text-orange-600 max-[700px]:flex-col max-[700px]:gap-10">
                 <div className="flex flex-col max-[700px]:items-center max-[700px]:gap-4">
                    <h1 className="text-[3em] font-black max-[1000px]:text-[2em] max-[1000px]:font-bold max-[700px]:text-center">How to Book with Mobilia</h1>
                    <p className="text-white text-[1.2em] w-[500px] max-[1000px]:text-[16px] max-[1000px]:w-[400px] max-[700px]:w-[300px] max-[700px]:text-center ">
                        Fast, simple, and flexible, reserve one or multiple vehicles in just a few steps.
                    </p>

                    <button className="bg-orange-600 text-white font-bold w-[170px] py-2 rounded-full mt-5 cursor-pointer transition-opacity duration-200 hover:opacity-70 active:opacity-50"
                    onClick={()=>navigate("/vehicules")}
                    >See Our Vehicules</button>

                 </div>

                 <div>
                    <img src="https://res.cloudinary.com/dub4fhabm/image/upload/v1758810957/f9acd86e-f18d-473b-9d5c-815ed26b1df2.png" alt="" 
                    className="w-[400px] h-[300px] object-contain max-[1000px]:w-[300px] max-[1000px]:h-[200px]"
                    />
                 </div>
            </div>

            <div className="w-full bg-white flex flex-col justify-center items-center">
                 <h1 className="text-orange-600 text-[2em] font-black mt-10 text-center">How to Book a Reservation</h1>

                 <nav className="flex flex-row gap-0 items-center mt-8 max-[1000px]:flex-wrap max-[1000px]:gap-5 justify-center">
                    {steps.map((s, i)=>{
                        return(
                            <div
                            key={s.step}
                            className="flex justify-center items-center border-b-3 px-3 py-1 cursor-pointer "
                            style={{borderBottomColor : currentStep === i ? "orange" : "lightgray",
                                fontWeight : currentStep === i ? "600" : "400"
                            }}
                            onClick={()=>setCurrentStep(i)} 
                            >
                                {s.step}
                            </div>
                        )
                    })}
                 </nav>

                 <div className="flex flex-col items-center justify-center mt-5 mb-15">
                    <img src={steps[currentStep].icon} alt={steps[currentStep].step} className="w-[100px] mt-5"/>
                    <p className="w-[300px] text-center text-gray-800 mt-4">
                    {steps[currentStep].text}
                    </p>
                 </div>
            </div>

            <div className="flex flex-col w-full py-10 justify-center items-center bg-orange-600 ">
                <h1 className="text-[2.5em] font-bold text-white text-center">Multiple Vehicle Reservations</h1>

              <div className="flex flex-row items-center justify-center gap-40 w-full mt-15 max-[1050px]:flex-col max-[1050px]:gap-10">
                <p className="text-[1.3em] text-gray-100 w-[500px]  mt-6 max-[1000px]:text-[1.1em] max-[1050px]:w-[400px] max-[1050px]:text-center max-[420px]:w-[320px]">
                   For <strong>special occasions</strong> or <strong>professional needs</strong> such as corporate events, weddings, or hotel partnerships, Mobilia offers you the possibility to <strong>reserve several vehicles at once</strong>. Unlike individual bookings, <strong>this service is not available online</strong>; instead, to ensure the <strong>best service</strong> and a <strong>tailored solution</strong>, we invite you to <strong>fill out the request form</strong> and <strong>schedule an appointment directly at our agency</strong>.
                </p>
                <img src="https://res.cloudinary.com/dub4fhabm/image/upload/v1758815496/b082eafe-f742-4015-abbd-587a936761f4.png" alt="Customer Service" className="w-[500px] max-[1100px]:w-[400px] max-[1000px]:w-[300px] object-contain"/>
                </div>

                
                   <button
                        className="text-white font-bold bg-black px-4 mt-10 py-2 rounded-full cursor-pointer transition-all duration-200 hover:bg-gray-950 active:bg-gray-900"
                        >
                        <Link to="#corporate">Book Your Corporate Reservation <span className="text-[1.1em]">&#8659;</span></Link>
                   </button>
                   
            </div>

            <div className="py-10 bg-gray-100 w-full flex flex-col justify-center items-center">
                
                <h1 className="text-[2em] font-bold text-center">Why book directly at the agency?</h1>

                <div className="flex flex-wrap justify-center items-center gap-15 mt-10 mb-15">
                    {why.map((w)=>{
                        return(
                            <div className="w-[300px] flex flex-col justify-center items-center gap-3 border-gray-400 rounded-2xl border-2 p-3 h-[270px] cursor-pointer transition-transform duration-300 hover:scale-105 shadow-2xl relative"
                            key={w.item}
                            >
                                <h1 className="font-bold text-[1.4em] text-center absolute top-3">{w.item}</h1>
                                <img src={w.icon} alt={w.item} className="w-[70px] mt-8"/>
                                <div className="text-center leading-6 text-gray-800">
                                    {w.text}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

            <RequestForm/>
            <FindUs/>
        </section>
    )
}

export default memo(Guide);