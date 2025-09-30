import { memo , useState, useEffect} from "react"
import { Link } from "react-router-dom";


const AdminHeader = () => {

   
   
     const [showNavAdmin, setShowNavAdmin] = useState<boolean>(()=>{
        const saved = localStorage.getItem('showNavAdmin');

        return saved ? JSON.parse(saved) : false;
    });

    useEffect(()=>{
        localStorage.setItem('showNavAdmin', JSON.stringify(showNavAdmin));
    }, [showNavAdmin]);
    return(
        <header className="flex flex-row justify-between items-center bg-black top-0 fixed w-full h-[50px] text-white px-10 max-[750px]:px-15 z-50">
            <h1 className="text-[1.5em] font-black font-sans"><Link to="/">Mobilia</Link></h1>

            <nav className="flex flex-row justify-center items-center gap-5 max-[750px]:hidden">
                <Link to="/admin/dashboard" className="linkNav">Dashboard</Link>
                <Link to="/admin/vehicules" className="linkNav">Vehicules</Link>
                <Link to="/admin/reservations" className="linkNav">Reservations</Link>
                <Link to="/admin/requests" className="linkNav">Requests</Link>
                <Link to="/admin/users" className="linkNav">Users</Link>
                <Link to="/admin/account" className="linkNav"><i className="fa-solid fa-user mr-1"></i> My Account</Link>
            </nav>

            <div onClick={()=>setShowNavAdmin(prev => !prev)} className="hidden max-[750px]:block text-[2em] font-black cursor-pointer transition-opacity duration-200 hover:opacity-70 active:opacity-50">&#9776;</div>

            {showNavAdmin
            &&  
               <nav className="absolute flex flex-col top-15 bg-black w-[170px] p-3 gap-3 right-3 z-50">
                <Link to="/admin/dashboard" className="linkNav" onClick={()=>setShowNavAdmin(false)}>Dashboard</Link>
                <Link to="/admin/vehicules" className="linkNav" onClick={()=>setShowNavAdmin(false)}>Vehicules</Link>
                <Link to="/admin/reservations" className="linkNav" onClick={()=>setShowNavAdmin(false)}>Reservations</Link>
                <Link to="/admin/requests" className="linkNav" onClick={()=>setShowNavAdmin(false)}>Requests</Link>
                <Link to="/admin/users" className="linkNav" onClick={()=>setShowNavAdmin(false)}><i className="fa-solid fa-user mr-1"></i> Users</Link>
                <Link to="/admin/account" className="linkNav" onClick={()=>setShowNavAdmin(false)}><i className="fa-solid fa-user mr-1"></i> My Account</Link>

                 <div className="absolute top-2 right-2 text-[1.2em] font-bold cursor-pointer transition-opacity duration-200 hover:opacity-80 active:opacity-60" onClick={()=>setShowNavAdmin(false)}>
                &#10005;
               </div>
               </nav>
            }
        </header>
    )

    
}

export default memo(AdminHeader);

