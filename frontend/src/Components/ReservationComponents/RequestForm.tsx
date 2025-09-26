import { memo ,  useState} from "react";
import { useRequestContext } from "../../Contexts/RequestContext";
import ReCAPTCHA from "react-google-recaptcha"


const RequestForm = () => {


     const {addRequest, msg} = useRequestContext();

       const [captchaToken, setCaptchaToken] = useState<string | null>(null);
    const handleSubmit = async(e : React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();

        const form = e.currentTarget;

        const formData = new FormData(form);

        const name = formData.get("name") as string;
        const email = formData.get("email") as string;
        const phoneNumber = formData.get("phone") as string;
        const organization = formData.get("organization") as string;
        const description = formData.get("description") as string;


        if(!name || !email || !phoneNumber || name.trim() === "" || email.trim() === "" || phoneNumber.trim() === "" || !captchaToken){
            return;
        }

                await addRequest(name, email, organization, phoneNumber, description, captchaToken);

                form.reset();


    }

    return(
        <section className="flex flex-col items-center w-full bg-orange-600 py-10">

            <h1 className="text-[2.2em] font-black text-white">Request Form</h1>

            <form onSubmit={handleSubmit} className="px-3 py-5 flex flex-col gap-5 bg-gray-100 border-3 border-gray-500 rounded-lg items-center mt-7">
                <input 
                type="text" 
                placeholder="Name"
                name="name"
                className="bg-gray-200 w-[250px] py-1 px-2  border border-gray-400 rounded-lg focus:ring-2 ring-orange-500"
                required
                />

                <input 
                type="email" 
                placeholder="Email"
                name="email"
                className="bg-gray-200 w-[250px] py-1 px-2  border border-gray-400 rounded-lg focus:ring-2 ring-orange-500"
                required
                />

                <input 
                type="tel" 
                placeholder="Tel"
                name="phone"
                className="bg-gray-200 w-[250px] py-1 px-2  border border-gray-400 rounded-lg focus:ring-2 ring-orange-500"
                required
                />

                <input 
                type="text" 
                placeholder="Organization"
                name="organization"
                className="bg-gray-200 w-[250px] py-1 px-2  border border-gray-400 rounded-lg focus:ring-2 ring-orange-500"
                />

                <textarea
                placeholder="Description"
                name="description"
                className="bg-gray-200 w-[250px] py-1 px-2  border border-gray-400 rounded-lg focus:ring-2 ring-orange-500"
                />

                 <ReCAPTCHA
          sitekey="6LenMtUrAAAAAN2I_jHBUGfzJJ9kmIZlbJ0rLbhq"
          onChange={(token : string | null) => setCaptchaToken(token)}
        />


                <button
                className="bg-black text-white font-bold w-[110px] py-2 rounded-[5px] border border-black transition-all duration-300 hover:bg-white hover:text-black cursor-pointer active:opacity-70"
                >Submit</button>
            </form>

            <div className="h-[50px] flex items-center justify-center mt-6">
                {msg !== "" && 
                <p className="w-[320px] text-center text-gray-100 text-[17px]">{msg}</p>
                }
                                 
            </div>
            
        </section>
    )
}


export default memo(RequestForm);