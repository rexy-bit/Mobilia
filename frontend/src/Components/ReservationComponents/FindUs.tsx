import { memo } from "react";

const FindUs = () => {

    return(
        <section className="flex flex-col items-center py-10 w-full bg-gray-200">
            
            <h1 className="text-black font-black text-[2.2em]">Where To Find Us</h1>

            <div className="flex flex-row justify-center items-center gap-10 mt-10 mb-10 max-[700px]:flex-col">
                         <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d102313.92247128973!2d3.0569302889110137!3d36.73912761596985!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x128fb26977ea659f%3A0x4231102d38a36f49!2sAlger!5e0!3m2!1sfr!2sdz!4v1758897813911!5m2!1sfr!2sdz"
            className="w-[600px] h-[400px] max-[1050px]:w-[400px] max-[1050px]:h-[300px] max-[800px]:w-[300px] max-[800px]:h-[200px] slideLeft"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade">
            </iframe>

              <div className="flex flex-col items-center gap-3">
                <p className="text-[1.2em] w-[400px] leading-6 text-center max-[450px]:w-[320px]">
                We welcome you to visit our agency, meet our professional team, and discuss your needs face-to-face.
                </p>
                <p className="font-bold">
                    145 El Biar, Algiers, Algeria
                </p>
                <p className="text-[19px]">
                   <i className="fa-solid fa-envelope"></i> mobilia@support.com
                </p>
              </div>
            </div>

            <div className="flex flex-row w-full items-center justify-center gap-20 max-[1000px]:gap-10 max-[750px]:flex-col">


                <p className="w-[400px] text-center text-[18px] font-bold max-[1000px]:w-[300px]">
                    Our team will be very happy to meet you in person, listen to your needs, and provide tailored solutions to ensure the best experience.
                </p>

                <img src="https://res.cloudinary.com/dub4fhabm/image/upload/v1758898703/f7e0660e-a35f-4ffa-bfa0-4fd5d19014ff.png" alt="Welcoming clients" className="w-[400px] h-[300px] object-contain max-[1000px]:w-[300px] max-[1000px]:h-[200px]"/>
            </div>
        </section>
    );
}


export default memo(FindUs);