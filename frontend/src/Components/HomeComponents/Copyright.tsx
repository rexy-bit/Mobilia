import  { memo } from "react";

const Copyright = () => {

    const year = new Date().getFullYear();
    return(

        <div className="w-full h-[60px] flex justify-center items-center bg-gray-300 text-center">
           &#169; {year} Mobilia. All rights reserved. Powered by Mobilia | Crafted with passion by Yanis.
        </div>
    )
}

export default memo(Copyright);