import { memo } from "react";
import { useNavigate } from "react-router-dom";
import About from "../Components/HomeComponents/About";
import Services from "../Components/HomeComponents/Services";
import Testimonials from "../Components/HomeComponents/Testimonials";
import GeneralFooter from "../Components/HomeComponents/GeneralFooter";
import Faq from "../Components/HomeComponents/Faq";
import Footer from "../Components/HomeComponents/Footer";
import Copyright from "../Components/HomeComponents/Copyright";



const Home = () => {

    const navigate = useNavigate();
    return(
        <section className="flex flex-col items-center w-full">

           
                <div style={{backgroundImage : "url('https://res.cloudinary.com/dub4fhabm/image/upload/v1759441066/8df271ca-5319-436b-8351-96f1e36f5273.png')"}} className="bg-cover bg-center w-full flex items-center justify-center h-[550px]">

                <div className="flex flex-col items-center w-full bg-black/60 h-full">
                  <h1 className="text-white text-[3em] font-black mt-10 max-[800px]:text-[2.5em] max-[400px]:text-[2.2em]">Welcome to Mobilia</h1>
                  <p className="text-white text-[20px] font-bold w-[600px] text-center mt-5 max-[800px]:text-[18px] max-[620px]:text-[17px] max-[620px]:w-[300px]">Your trusted car rental agency. Choose from a wide range of vehicles at the best prices, anytime, anywhere.</p>
                  <p className="text-white text-[18px] font-bold w-[500px] text-center mt-5 max-[600px]:text-[15px] max-[600px]:w-[300px]">
                    Drive with freedom. From city cars to luxury SUVs, find the perfect ride for your next journey.
                  </p>

                  <div className="flex flex-row justify-center items-center gap-5 mt-8">
                    <button className="w-[140px] bg-gray-100 text-[15px] font-bold py-2 rounded-[5px] cursor-pointer transition-all duration-200 hover:opacity-80 active:opacity-60"
                    onClick={()=>navigate("/vehicules")}
                    >
                        Explore Vehicules
                    </button>

                    <button className="w-[140px] bg-orange-600 text-white text-[15px] font-bold py-2 rounded-[5px] cursor-pointer transition-all duration-200 hover:opacity-80 active:opacity-60"
                    onClick={()=>navigate("/guide")}
                    >
                        Booking Guide
                    </button>
                  </div>
                    
                </div>
                      
                </div>
           
              <About/>
              <Services/>
               <Testimonials/>
               <GeneralFooter/>
               <Faq/>
               <Footer/>
               <Copyright/>

        </section>
    );
}

export default memo(Home);

