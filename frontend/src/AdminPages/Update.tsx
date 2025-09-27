import { memo, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { useVehiculesContext } from "../Contexts/VehiculesContext";


const Update = () => {

    const {id} = useParams();
    const [imageFiles, setImageFiles] = useState<File[]>([]);

    const {getVehicule, updateVehicule, vehiculeDetails, setVehiculeDetails, loadingVehicules} = useVehiculesContext();

    useEffect(()=>{
       getVehicule(id);
    }, [id]);

    if(!vehiculeDetails){
        return(
          <div className="mt-10">Vehicule Not found</div>
        );
    }

    const navigate = useNavigate();



    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {

        const {name, value, type} = e.target;

        setVehiculeDetails({
            ...vehiculeDetails!,
            [name] : type === "number" ? Number(value) : value
        });
    }


        const submitForm = async(e : React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();

        if(!vehiculeDetails?.brand || !vehiculeDetails?.model || !vehiculeDetails?.category || vehiculeDetails?.priceDay === undefined || !vehiculeDetails?.available || !vehiculeDetails?.fuelType || vehiculeDetails?.seats === undefined || !vehiculeDetails?.transmission || vehiculeDetails?.year === undefined || !vehiculeDetails?.description){
            return;
        }

        const formData = new FormData();

        formData.append("brand", vehiculeDetails?.brand);
        formData.append("model", vehiculeDetails?.model)
        formData.append("category", vehiculeDetails?.category);
        formData.append("priceDay", String(vehiculeDetails?.priceDay));
        formData.append("available", String(vehiculeDetails?.available));
        formData.append("fuelType", vehiculeDetails?.fuelType);
        formData.append("seats", String(vehiculeDetails?.seats));
        formData.append("transmission", vehiculeDetails?.transmission);
        formData.append("year", String(vehiculeDetails?.year));
        formData.append("description", vehiculeDetails?.description);
        formData.append("oldImages", JSON.stringify(vehiculeDetails.images));

            imageFiles.forEach((file) => {
            formData.append("images", file); // "images" doit être le même nom que celui attendu par ton backend (Multer par ex)
            });

            await updateVehicule(vehiculeDetails._id, formData);
    }

    
    return(

        <section className="flex flex-col items-center min-h-screen w-full relative">
             
                  {
                 loadingVehicules ?
                  <div className="mt-20">
                  <i className="fa-solid fa-car-side fa-spin text-[2.5em]"></i>
               </div> : 
               <div className="flex flex-col items-center">
                   <h1 className="mt-10 text-[1.8em] font-black text-center">Update and View Vehicule Details</h1>
                  <form onSubmit={submitForm} className="flex flex-col p-3 bg-gray-200 border-3 border-orange-600 rounded-xl gap-5 py-5 mt-7 mb-15 w-[500px] items-center max-[550px]:w-[400px] max-[420px]:w-[350px] max-[380px]:w-[350px]">
                    <div>
                      <p>Brand:</p>
                       <input 
                       type="text" 
                       name="brand"
                        className="bg-gray-50 px-2 py-1 w-[400px] rounded-[5px] border border-gray-300  focus:ring-2 ring-orange-500 max-[450px]:w-[350px] max-[380px]:w-[320px]"
                        value={vehiculeDetails?.brand}
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
                        value={vehiculeDetails?.model}
                        onChange={handleChange}
                       required
                       />
                       </div>
 
                      <div>
                        <p>Category:</p>
                       <select 
                       name="category" 
                       value={vehiculeDetails?.category}
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
                       value={vehiculeDetails?.priceDay}
                       onChange={handleChange}
                       />
                       </div>

                       <div>
                        <p>Available:</p>
                        <select 
                        name="available" 
                       className="bg-gray-50 px-2 py-1 w-[400px] rounded-[5px] border border-gray-300  focus:ring-2 ring-orange-500 max-[450px]:w-[350px] max-[380px]:w-[320px]"
                         value={vehiculeDetails?.available ? "true" : "false"}
                        onChange={handleChange}
                        >
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                        </select>
                       </div>

                       <div>
                        <p>Fuel Type:</p>
                        <select name="fuelType" id=""
                        value={vehiculeDetails?.fuelType}
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
                        value={vehiculeDetails?.seats}
                        onChange={handleChange}
                        />
                        </div>

                        <div>
                          <p>Transmission:</p>
                        <select name="transmission" 
                        id=""
                        className="bg-gray-50 px-2 py-1 w-[400px] rounded-[5px] border border-gray-300  focus:ring-2 ring-orange-500 max-[450px]:w-[350px] max-[380px]:w-[320px]"
                        value={vehiculeDetails?.transmission}
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
                        value={vehiculeDetails?.year}
                        onChange={handleChange}
                        />
                        </div>

                        <div>
                          <p>Description:</p>
                        <textarea
                        className="bg-gray-50 px-2 py-1 w-[400px] rounded-[5px] border border-gray-300  focus:ring-2 ring-orange-500 max-[450px]:w-[350px] max-[380px]:w-[320px]"
                        placeholder="Description"
                        name="description"
                        value={vehiculeDetails?.description}
                        onChange={handleChange}
                        />
                        </div>

                            <div className="flex flex-col justify-center items-center">
      <p className="font-bold text-[1.5em] text-orange-600">Images</p>


      <div className="flex flex-wrap gap-5 items-center justify-center">
        {vehiculeDetails?.images.map((m : string,i : number)=>{
            return(
                <div key={i} className="relative">
                <img src={m} alt={vehiculeDetails.model} className="w-[100px] h-[100px] object-contain"/>
                <button className="absolute top-5 right-1 text-red-600 cursor-pointer transition-opacity duration-200 hover:opacity-80 active:opacity-60" onClick={()=>{
                    setVehiculeDetails({
                        ...vehiculeDetails,
                        images : vehiculeDetails.images.filter((img)=> img !== m)
                    })
                }}
                type="button"
                >
                    
                    &#10006;
                </button>
                </div>
            )
        })}
      </div>

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
      />

      {imageFiles.length > 0 && (
        <div className="flex gap-3 mt-5 flex-col justify-center">
          {imageFiles.map((file, idx) => (
            <div key={idx} className="relative">
            <img
              
              src={URL.createObjectURL(file)}
              alt={`preview-${idx}`}
              className="w-[150px] h-[150px] object-contain"
            />

              <button className="absolute top-5 right-1 text-red-600 cursor-pointer transition-opacity duration-200 hover:opacity-80 active:opacity-60" onClick={()=>{
                    setImageFiles(prev => prev.filter((img)=>img !== file))
                }}
                type="button"
                >
                     &#10006;
                </button>
            </div>
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

export default memo(Update);