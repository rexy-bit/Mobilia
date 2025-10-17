

const GeneralFooter = () => {

    return(
        <section className="flex flex-col items-center w-full bg-black text-white py-10" id="contact">

              <h1 className="text-[2.5em] font-black max-[400px]:text-[2.1em]">Contact & Location</h1>

              <p className="text-[18px] max-[600px]:w-[300px] text-center mt-5">
                With Mobilia Rent your freedom, wherever you are in Algeria.
              </p>

              <div className="flex flex-row justify-center items-center mt-15 gap-30 max-[1285px]:gap-20 max-[1000px]:gap-10 max-[900px]:flex-col mb-10">

                <div className="slideLeft flex flex-col gap-2">
                    <p className="text-[1.2em]"><i className="fa-solid fa-phone text-[1.3em] font-black mr-1"></i> +213 555 123 456</p>
                    <p className="text-[1.2em]"><i className="fa-solid fa-envelope text-[1.3em] font-black mr-1"></i> contact@mobilia.com</p>
                    <p className="text-[1.2em]"><i className="fa-solid fa-location-dot text-[1.3em] font-black mr-1"></i> El Biar, Algiers, Algeria</p>
                    <p className="text-[1.2em]"><i className="fa-solid fa-clock text-[1.3em] font-black mr-1"></i> Sat–Thu: 8:00 AM – 8:00 PM</p>
                </div>

                                         <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d102313.92247128973!2d3.0569302889110137!3d36.73912761596985!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x128fb26977ea659f%3A0x4231102d38a36f49!2sAlger!5e0!3m2!1sfr!2sdz!4v1758897813911!5m2!1sfr!2sdz"
            className="w-[500px] h-[350px] max-[1050px]:w-[400px] max-[1050px]:h-[300px] max-[800px]:w-[300px] max-[800px]:h-[200px] slideRight"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade">
            </iframe>
              </div>

        </section>
    )

}


export default GeneralFooter;