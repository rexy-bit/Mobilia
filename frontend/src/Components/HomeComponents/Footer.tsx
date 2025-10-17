import { memo } from "react"



const Footer = () => {

    return(

        <section className="bg-black flex flex-col items-center w-full py-10 text-white">

            <h1 className="text-[2.5em] font-black">Mobilia</h1>

            <p className="mt-8 w-[600px] text-center text-[17px] max-[650px]:w-[300px] max-[650px]:text-[16px]">
                Mobilia, Your trusted car rental agency in Algeria. Offering affordable, reliable, and flexible car rental services in Algiers and beyond.
            </p>

            <div className="flex flex-row  justify-center mt-20 gap-40 max-[1000px]:gap-30 max-[900px]:gap-20 max-[700px]:gap-15 max-[650px]:gap-10 max-[640px]:flex-col">

                 <div className="flex flex-col items-center">
                    <p className="font-bold text-[20px]">Quick Links</p>
                    <div className="flex flex-col items-center mt-3 gap-1">
                        <a href="/">Home</a>
                        <a href="#about">About</a>
                        <a href="#services">Services</a>
                        <a href="#faq">FAQ</a>
                        <a href="#testimonials">Testimonials</a>
                        <a href="#contact">Contact Us</a>
                    </div>
                 </div>

                 <div className="flex flex-col items-center">
                    <p className="font-bold text-[20px]">Contact</p>

                    <div className="flex flex-col items-center mt-3 gap-1">
                         <p className="text-[1em]"><i className="fa-solid fa-phone text-[1.3em] font-black mr-1"></i> +213 555 123 456</p>
                    <p className="text-[1em]"><i className="fa-solid fa-envelope text-[1.3em] font-black mr-1"></i> contact@mobilia.com</p>
                    <p className="text-[1em]"><i className="fa-solid fa-location-dot text-[1.3em] font-black mr-1"></i> El Biar, Algiers, Algeria</p>
                    <p className="text-[1em]"><i className="fa-solid fa-clock text-[1.3em] font-black mr-1"></i> Sat–Thu: 8:00 AM – 8:00 PM</p>
                    </div>
                 </div>

                 <div className="flex flex-col items-center">
                    <p className="font-bold text-[20px]">Follow Us</p>

                   <div className="flex flex-col items-center gap-1 mt-3">
                    <div className="text-[2.5em] transition-transform duration-200 hover:scale-110 active:scale-95 cursor-pointer"><i className="fa-brands fa-instagram"></i></div>

                    <div className="text-[2.5em] transition-transform duration-200 hover:scale-110 active:scale-95 cursor-pointer"><i className="fa-brands fa-facebook"></i></div>
                    </div>
                 </div>
            </div>



        </section>
    )
}


export default memo(Footer);