import  { memo } from "react"


const About = () => {

    return(
        <div className="flex flex-col w-full items-center">
            <h1 className="text-[3em] font-black mt-10">About Us</h1>

            <div className="flex flex-row justify-center items-center w-full mt-10 gap-50 max-[1000px]:gap-30 max-[950px]:gap-20 max-[700px]:flex-col max-[700px]:gap-10">

                <p className="w-[400px] text-[17px] max-[950px]:w-[300px] max-[700px]:text-center slideLeft">
                    At Mobilia, we believe that renting a car should be simple, transparent, and stress-free. Our mission is to provide you with a wide range of modern and reliable vehicles at competitive prices, whether you need a car for business, travel, or everyday use.
                </p>

                <img src="https://res.cloudinary.com/dub4fhabm/image/upload/v1759440871/2b4b37e0-d150-4e6a-82f8-5bca68d91bae.png" alt="" 
                className="w-[400px] h-[200px] object-contain max-[950px]:w-[300px] slideRight"
                />
            </div>

            <div className="flex flex-row justify-center items-center w-full mt-10 gap-50 mb-15 max-[1000px]:gap-30 max-[950px]:gap-20 max-[700px]:flex-col max-[700px]:gap-10">
                <img src="https://res.cloudinary.com/dub4fhabm/image/upload/v1759443008/1d226deb-1e31-4082-af11-2edb1277cfde.png" alt="" 
                className="w-[400px] h-[200px] object-contain max-[950px]:w-[300px] slideLeft"
                />

                <p className="w-[400px] text-[17px] max-[950px]:w-[300px] max-[700px]:text-center slideRight">
                    With our easy booking system, flexible rental options, and 24/7 customer support, Mobilia is here to make every journey more comfortable and convenient.
                </p>
            </div>
        </div>
    )
}


export default memo(About);