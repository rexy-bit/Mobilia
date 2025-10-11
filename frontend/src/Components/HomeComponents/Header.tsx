
import { memo, useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"

const Header = () => {

    const [showNav, setShowNav] = useState<boolean>(()=>{
        const saved = localStorage.getItem('showNav');

        return saved ? JSON.parse(saved) : false;
    });

    useEffect(()=>{
        localStorage.setItem('showNav', JSON.stringify(showNav));
    }, [showNav]);

    const loaction = useLocation();
    return(
        <header className="flex flex-row justify-between items-center bg-black top-0 fixed w-full h-[50px] text-white px-10 max-[750px]:px-15 z-50">
            <h1 className="text-[1.5em] font-black font-sans"><Link to="/">Mobilia</Link></h1>

            <nav className="flex flex-row justify-center items-center gap-5 max-[750px]:hidden">
                <Link to="/" className="linkNav"  style={{fontWeight : loaction.pathname === "/" ? "900" : "400"}}>Home</Link>
                <Link to="/vehicules" className="linkNav"  style={{fontWeight : loaction.pathname === "/vehicules" ? "900" : "400"}}>Vehicules</Link>
                <Link to="/reservations" className="linkNav"  style={{fontWeight : location.pathname === "/reservations" ? "900" : "400"}}>My Reservations</Link>
                <Link to="/guide" className="linkNav" style={{fontWeight : location.pathname === "/guide" ? "900" : "400"}}>Booking Guide</Link>
                <Link to="/account" className="linkNav" style={{fontWeight : location.pathname === "/account" ? "900" : "400"}}><i className="fa-solid fa-user mr-1"></i> My Account</Link>
            </nav>

            <div onClick={()=>setShowNav(prev => !prev)} className="hidden max-[750px]:block text-[2em] font-black cursor-pointer transition-opacity duration-200 hover:opacity-70 active:opacity-50">&#9776;</div>

            {showNav
            &&  
               <nav className="absolute flex flex-col top-15 bg-black w-[170px] p-3 gap-3 right-3 z-50">
                <Link to="/" className="linkNav" onClick={()=>setShowNav(false)}>Home</Link>
                <Link to="/vehicules" className="linkNav" onClick={()=>setShowNav(false)}>Vehicules</Link>
                <Link to="/reservations" className="linkNav" onClick={()=>setShowNav(false)}>My Reservations</Link>
                <Link to="/guide" className="linkNav" onClick={()=>setShowNav(false)}>Booking Guide</Link>
                <Link to="/account" className="linkNav" onClick={()=>setShowNav(false)}><i className="fa-solid fa-user mr-1"></i> My Account</Link>

                 <div className="absolute top-2 right-2 text-[1.2em] font-bold cursor-pointer transition-opacity duration-200 hover:opacity-80 active:opacity-60" onClick={()=>setShowNav(false)}>
                &#10005;
               </div>
               </nav>
            }
        </header>
    )
}

export default memo(Header);