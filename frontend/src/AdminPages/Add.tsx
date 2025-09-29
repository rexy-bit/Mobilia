import { memo,  useState } from "react";
import { useVehiculesContext } from "../Contexts/VehiculesContext";
import { useNavigate } from "react-router-dom";




const Add = () => {

    const [vehicule, setVehicule] = useState({
        brand : "",
        model : "",
        category : "Standard",
        priceDay : 0,
        available : "true",
        fuelType : "Petrol",
        seats : 0,
        transmission : "Manual",
        year : 2000,
        description : ""
    });

    const navigate = useNavigate();
     const [imageFiles, setImageFiles] = useState<File[]>([]);

     const {addVehicule} = useVehiculesContext();

    const {loadingVehicules} = useVehiculesContext();
    const handleChange = (e : React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {

        const {name, value, type} = e.target;

        setVehicule({
            ...vehicule,
            [name] : type === "number" ?  Number(value) : value
        });

    }

    const submitForm = async(e : React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();

        if(!vehicule.brand || !vehicule.model || !vehicule.category || vehicule.priceDay === undefined || !vehicule.available || !vehicule.fuelType || vehicule.seats === undefined || !vehicule.transmission || vehicule.year === undefined || !vehicule.description){
            return;
        }

        const formData = new FormData();

        formData.append("brand", vehicule.brand);
        formData.append("model", vehicule.model)
        formData.append("category", vehicule.category);
        formData.append("priceDay", String(vehicule.priceDay));
        formData.append("available", vehicule.available);
        formData.append("fuelType", vehicule.fuelType);
        formData.append("seats", String(vehicule.seats));
        formData.append("transmission", vehicule.transmission);
        formData.append("year", String(vehicule.year));
        formData.append("description", vehicule.description);

            imageFiles.forEach((file) => {
            formData.append("images", file); // "images" doit être le même nom que celui attendu par ton backend (Multer par ex)
            });

            await addVehicule(formData);
    }


    return(
        <section className="flex flex-col min-h-screen items-center">

            {
                 loadingVehicules ?
                  <div className="mt-20">
                  <i className="fa-solid fa-car-side fa-spin text-[2.5em]"></i>
               </div> : 
               <div className="flex flex-col items-center">
                   <h1 className="mt-10 text-[1.8em] font-black">Add a New Vehicule</h1>
                  <form onSubmit={submitForm} className="flex flex-col p-3 bg-gray-200 border-3 border-orange-600 rounded-xl gap-5 py-5 mt-7 mb-15">
                    <div>
                      <p>Brand:</p>
                       <input 
                       type="text" 
                       name="brand"
                        className="bg-gray-50 px-2 py-1 w-[400px] rounded-[5px] border border-gray-300  focus:ring-2 ring-orange-500 max-[450px]:w-[350px] max-[380px]:w-[320px]"
                        value={vehicule.brand}
                        placeholder="Brand"
                        onChange={handleChange}

                       required
                       />
                       </div>

                        <div>
                          <p>Model:</p>
                           <input 
                       type="text" 
                       name="model"
                       className="bg-gray-50 px-2 py-1 w-[400px] rounded-[5px] border border-gray-300  focus:ring-2 ring-orange-500 max-[450px]:w-[350px] max-[380px]:w-[320px]"
                       placeholder="Model"
                        value={vehicule.model}
                        onChange={handleChange}
                       required
                       />
                       </div>
 
                      <div>
                        <p>Category:</p>
                       <select 
                       name="category" 
                       value={vehicule.category}
                      className="bg-gray-50 px-2 py-1 w-[400px] rounded-[5px] border border-gray-300  focus:ring-2 ring-orange-500 max-[450px]:w-[350px] max-[380px]:w-[320px]"
                       onChange={handleChange}
                       >
                         <option value="Standard">Standard</option>
                         <option value="SUV">SUV</option>
                         <option value="Luxury">Luxury</option>
                         <option value="Utility">Utility</option>
                         <option value="Electric">Electric</option>
                       </select>
                       </div>

                      <div>
                        <p>Price Per Day:</p>
                       <input 
                       type="number"
                       min={0}
                       name="priceDay"
            className="bg-gray-50 px-2 py-1 w-[400px] rounded-[5px] border border-gray-300  focus:ring-2 ring-orange-500 max-[450px]:w-[350px] max-[380px]:w-[320px]"
                       placeholder="Price Day"
                       value={vehicule.priceDay}
                       onChange={handleChange}
                       />
                       </div>

                       <div>
                        <p>Available:</p>
                        <select 
                        name="available" 
                       className="bg-gray-50 px-2 py-1 w-[400px] rounded-[5px] border border-gray-300  focus:ring-2 ring-orange-500 max-[450px]:w-[350px] max-[380px]:w-[320px]"
                         value={vehicule.available ? "true" : "false"}
                        onChange={handleChange}
                        >
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                        </select>
                       </div>

                       <div>
                        <p>Fuel Type:</p>
                        <select name="fuelType" id=""
                        value={vehicule.fuelType}
                        className="bg-gray-50 px-2 py-1 w-[400px] rounded-[5px] border border-gray-300  focus:ring-2 ring-orange-500 max-[450px]:w-[350px] max-[380px]:w-[320px]"
                        onChange={handleChange}
                        >
                            <option value="Petrol">Petrol</option>
                            <option value="Diesel">Diesel</option>
                            <option value="Electric">Electric</option>
                            <option value="Hybrid">Hybrid</option>
                        </select>
                       </div>

                       <div>
                        <p>Seats:</p>
                        <input type="number" 
                        min={0}
                        name="seats"
                        className="bg-gray-50 px-2 py-1 w-[400px] rounded-[5px] border border-gray-300  focus:ring-2 ring-orange-500 max-[450px]:w-[350px] max-[380px]:w-[320px]"
                        placeholder="Seats"
                        value={vehicule.seats}
                        onChange={handleChange}
                        />
                        </div>

                        <div>
                          <p>Transmission:</p>
                        <select name="transmission" 
                        id=""
                        className="bg-gray-50 px-2 py-1 w-[400px] rounded-[5px] border border-gray-300  focus:ring-2 ring-orange-500 max-[450px]:w-[350px] max-[380px]:w-[320px]"
                        value={vehicule.transmission}
                        onChange={handleChange}
                         
                        >
                            <option value="Auto">Auto</option>
                            <option value="Manual">Manual</option>
                        </select>
                        </div>

                        <div>
                          <p>Year:</p>
                        <input type="number" 
                        min={1900}
                       className="bg-gray-50 px-2 py-1 w-[400px] rounded-[5px] border border-gray-300  focus:ring-2 ring-orange-500 max-[450px]:w-[350px] max-[380px]:w-[320px]"
                        name="year"
                        placeholder="year"
                        value={vehicule.year}
                        onChange={handleChange}
                        />
                        </div>

                        <div>
                          <p>Description:</p>
                        <textarea
                        className="bg-gray-50 px-2 py-1 w-[400px] rounded-[5px] border border-gray-300  focus:ring-2 ring-orange-500 max-[450px]:w-[350px] max-[380px]:w-[320px]"
                        placeholder="Description"
                        name="description"
                        value={vehicule.description}
                        onChange={handleChange}
                        />
                        </div>

                            <div className="flex flex-col justify-center items-center">
      <p className="font-bold text-[1.5em] text-blue-900">Images</p>

      <input
        type="file"
        accept="image/jpeg,image/png,image/webp,image/jpg"
        multiple
        onChange={(e) => {
          if (e.target.files) {
            setImageFiles((prev) => [...prev, ...Array.from(e.target.files)]);

          }
        }}
        className="p-3 border border-gray-300 bg-gray-100 rounded-full cursor-pointer"
        required
      />

      {imageFiles.length > 0 && (
        <div className="flex gap-0 mt-5 flex-col justify-center">
          {imageFiles.map((file, idx) => (
            <img
              key={idx}
              src={URL.createObjectURL(file)}
              alt={`preview-${idx}`}
              className="w-[150px] h-[150px] object-contain"
            />
          ))}
        </div>
      )}
    </div>


                        <button type="submit" className="w-full bg-orange-600 text-white font-bold py-2 rounded-[5px] cursor-pointer transition-opacity duration-200 hover:opacity-70 active:opacity-50">Submit</button>
                  </form>
                </div>
            }

              <button
            className="bg-white text-black font-bold absolute top-2 left-2 px-3 py-1 border-2 border-black rounded-full cursor-pointer transition-all duration-300 hover:bg-gray-100 active:bg-gray-200"
            onClick={()=>navigate(-1)}
            >&#8592; Back</button>

        </section>
    )
}

export default memo(Add);