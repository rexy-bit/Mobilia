import { memo } from "react"
import Header from "../Components/HomeComponents/Header";
import { Outlet } from "react-router-dom";


const PublicLayout = () => {

    return(
        <>
          <Header/>

          <main>
            <Outlet/>
          </main>
        </>
    )
}

export default memo(PublicLayout);