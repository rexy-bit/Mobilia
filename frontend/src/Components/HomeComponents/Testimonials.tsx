
import  { memo } from "react"
import Counter from "./Counter"

const testimonials = [
    {
        name : "Sarah",
        test : "Mobilia made my trip stress-free. The car was spotless, the booking was quick, and the team was super helpful. Highly recommend!"
    },{
        name : "Ahmed",
        test : "Great experience! Affordable prices, easy process, and I found exactly the SUV I needed for my family vacation."
    },{
        name : "Hana",
        test : "Transparent prices and no hidden fees — exactly what I was looking for. Mobilia is now my go-to rental service."
    },{
        name : "Rayane",
        test : "The support team was available at midnight when I needed help with my reservation. Truly 24/7 service!"
    }
]
const Testimonials = () => {


    return(
        <div className="w-full bg-white py-10 flex flex-col justify-center items-center" id="testimonials">

            <h1 className="text-[2.5em] font-black">Testimonials</h1>

            <div className="flex flex-col justify-center items-center gap-5 mb-15 mt-15">
               {testimonials.map((t)=>{
                return(
                     <div key={t.name} className="w-[800px] flex flex-col p-2 shadow shadow-2xl rounded-[10px] max-[820px]:w-[500px] max-[530px]:w-[300px] transition-all duration-300 hover:scale-105 cursor-pointer">
                    <div className="flex flex-row gap-2 items-center">
                        <img src="https://res.cloudinary.com/dub4fhabm/image/upload/v1759694972/noProfile_vtvyzh.jpg" alt={t.name} className="w-[50px] rounded-full"/>
                        <div className="font-bold">{t.name}</div>
                    </div>

                    <div className="text-gray-800">
                        {t.test}
                    </div>
                  </div>
                )
               })}
            </div>

                <div className="flex flex-row justify-center items-center gap-5 mb-15">
                <div className="flex flex-col items-center">
                   <Counter end={500} />

                   <p>Satisfied Clients</p>
                </div>

                <div className="flex flex-col items-center">
                    <Counter end={120} duration={20}/>
                    <p>Homes sold</p>
                </div>

                <div className="flex flex-col items-center">
                    <Counter end={80} duration={20}/>
                    <p>Houses Rented</p>
                </div>
           </div>

        </div>
    )
}


export default memo(Testimonials);