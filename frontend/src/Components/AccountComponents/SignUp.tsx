import  { memo } from "react"
import { useAuthContext } from "../../Contexts/AuthContext";


const SignUp = () => {

    const {signUp, error} = useAuthContext();

    const handleSubmit = async(e : React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();

        const form = e.currentTarget;

        const formData = new FormData(form);

        const name = formData.get("name") as string;
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        if(!name || !email || !password || name.trim() === "" || email.trim() === "" || password.trim() === ""){
            return;
        }

        await signUp(name, email, password);

    }

    return(
        <div className="flex flex-col justify-center items-center">
            <h1 className="text-[1.6em] font-bold mt-5">Sign Up</h1>

            <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center gap-3 mt-5">
                <input 
                type="text"
                name="name"
                placeholder="Name"
                  className="bg-gray-100 w-[250px] py-1 px-2  border border-gray-300 rounded-lg focus:ring-2 ring-orange-500"
                required
                />
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
                >Sign Up</button>

                <div className="h-[20px] flex justify-center items-center">
                    {error && <p className="font-bold text-red-600">{error}</p>}
                </div>
            </form>
        </div>
    )
}


export default memo(SignUp);