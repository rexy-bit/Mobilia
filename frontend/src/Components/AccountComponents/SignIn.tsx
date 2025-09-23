import  { memo } from "react"
import { useAuthContext } from "../../Contexts/AuthContext";


const SignIn = () => {

    const {signIn, error} = useAuthContext();

    const handleSubmit = async(e : React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();

        const form = e.currentTarget;

        const formData = new FormData(form);

        
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        if( !password || !email || email.trim() === "" || password.trim() === ""){
            return;
        }

        await signIn( email, password);

    }

    return(
        <div className="flex flex-col justify-center items-center">
            <h1 className="text-[1.6em] font-bold mt-5">Sign In</h1>

            <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center gap-3 mt-5">
               
                <input 
                type="email" 
                placeholder="Email"
                name="email"
                className="bg-gray-100 w-[250px] py-1 px-2  border border-gray-300 rounded-lg focus:ring-2 ring-orange-500"
                
                required
                />

                <input 
                type="password" 
                name="password"
                placeholder="password"
                className="bg-gray-100 w-[250px] py-1 px-2  border border-gray-300 rounded-lg focus:ring-2 ring-orange-500"
                required
                />

                <button
                type="submit"
                className="w-[100px] bg-black text-white font-bold py-1 rounded-full border border-black cursor-pointer transition-all duration-300 hover:bg-white hover:text-black active:opacity-70 mt-5"
                >Sign In</button>

                <div className="h-[20px] flex justify-center items-center">
                    {error && <p className="font-bold text-red-600">{error}</p>}
                </div>
            </form>
        </div>
    )
}


export default memo(SignIn);