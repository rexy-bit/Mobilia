import { memo,  useState } from "react";
import { useVehiculesContext } from "../Contexts/VehiculesContext";




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
               <div>
                   <h1>Add a New Vehicule</h1>
                  <form onSubmit={submitForm}>
                       <input 
                       type="text" 
                       name="brand"
                        value={vehicule.brand}
                        placeholder="Brand"
                        onChange={handleChange}

                       required
                       />

                           <input 
                       type="text" 
                       name="model"
                       placeholder="Model"
                        value={vehicule.model}
                        onChange={handleChange}
                       required
                       />

                       <select 
                       name="category" 
                       value={vehicule.category}
                       onChange={handleChange}
                       >
                         <option value="Standard">Standard</option>
                         <option value="SUV">SUV</option>
                         <option value="Luxury">Luxury</option>
                         <option value="Utility">Utility</option>
                         <option value="Electric">Electric</option>
                       </select>

                       <input 
                       type="number"
                       min={0}
                       name="priceDay"
                       placeholder="Price Day"
                       value={vehicule.priceDay}
                       onChange={handleChange}
                       />

                        <select 
                        name="available" 
                         value={vehicule.available ? "true" : "false"}
                        onChange={handleChange}
                        >
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                        </select>

                        <select name="fuelType" id=""
                        value={vehicule.fuelType}
                        onChange={handleChange}
                        >
                            <option value="Petrol">Petrol</option>
                            <option value="Diesel">Diesel</option>
                            <option value="Electric">Electric</option>
                            <option value="Hybrid">Hybrid</option>
                        </select>

                        <input type="number" 
                        min={0}
                        name="seats"
                        placeholder="Seats"
                        value={vehicule.seats}
                        onChange={handleChange}
                        />

                        <select name="transmission" 
                        id=""
                        value={vehicule.transmission}
                        onChange={handleChange}
                         
                        >
                            <option value="Auto">Auto</option>
                            <option value="Manual">Manual</option>
                        </select>

                        <input type="number" 
                        min={1900}
                        name="year"
                        placeholder="year"
                        value={vehicule.year}
                        onChange={handleChange}
                        />

                        <textarea
                      
                        placeholder="Description"
                        name="description"
                        value={vehicule.description}
                        onChange={handleChange}
                        />

                            <div className="flex flex-col justify-center items-center">
      <p className="font-bold text-[1.5em] text-blue-900">Images</p>

      <input
        type="file"
        accept="image/jpeg,image/png,image/webp,image/jpg"
        multiple
        onChange={(e) => {
          if (e.target.files) {
            setImageFiles(Array.from(e.target.files));
          }
        }}
        className="p-3 border border-gray-300 bg-gray-100 rounded-full cursor-pointer"
        required
      />

      {imageFiles.length > 0 && (
        <div className="flex gap-3 mt-5 flex-wrap justify-center">
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


                        <button type="submit">Submit</button>
                  </form>
                </div>
            }

        </section>
    )
}

export default memo(Add);