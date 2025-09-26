import { memo } from "react";
import { useVehiculesContext } from "../../Contexts/VehiculesContext"


const FilterComponent = () => {

    const {setFilterData, filterData} = useVehiculesContext();

    const handleChange = (e : React.ChangeEvent<HTMLSelectElement>) => {
        const {name, value}= e.target;

        setFilterData({
            ...filterData,
            [name] : name === "seats" ? Number(value) : value
        })
    }

    return(
        <div className="flex flex-col items-center mt-7 gap-5">
            <div className="flex flex-col gap-5">
            <div className="flex flex-row items-center justify-center gap-5 max-[600px]:flex-col max-[600px]:items-baseline">
                <div className="flex flex-row justify-center items-center gap-1">
                    <p className="font-bold text-[15px]">Category:</p>
                <select 
                name="category" 
                id="" 
                className="bg-gray-100 border border-gray-300 py-1 px-2 rounded-[5px] w-[150px] cursor-pointer"
                value={filterData.category}
                onChange={handleChange}>
                    <option value="">All</option>
                    <option value="Standard">Standard</option>
                    <option value="SUV">SUV</option>
                    <option value="Luxury">Luxury</option>
                    <option value="Utility">Utility</option>
                    <option value="Electric">Electric</option>
                    
                </select>
                </div>


                <div className="flex flex-row items-center justify-center gap-1">
                    <p className="font-bold text-[15px]">Seats:</p>
                <select 
                name="seats" 
                id=""
                 className="bg-gray-100 border border-gray-300 py-1 px-2 rounded-[5px] w-[150px] cursor-pointer"
                value={filterData.seats}
                onChange={handleChange}

                >
                    <option value={0}>All</option>
                    <option value={2}>2</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                    <option value={6}>6</option>
                    <option value={7}>7</option>
                </select>
                </div>
            </div>

            <div className="flex flex-row items-center justify-center gap-5 max-[600px]:flex-col max-[600px]:items-baseline">
                <div  className="flex flex-row items-center justify-center gap-1">
                    <p className="font-bold text-[15px]">Transmission:</p>
                <select 
                name="transmission" 
                id=""
                className="bg-gray-100 border border-gray-300 py-1 px-2 rounded-[5px] w-[150px] cursor-pointer"
                value={filterData.transmission}
                onChange={handleChange}
                >
                    <option value="">All</option>
                    <option value="Auto">Auto</option>
                    <option value="Manual">Manual</option>
                </select>
                </div>


                <div className="flex flex-row items-center justify-center gap-1">
                    <p className="font-bold text-[15px]">Fuel Type:</p>
                <select 
                name="fuelType" 
                id=""
                className="bg-gray-100 border border-gray-300 py-1 px-2 rounded-[5px] w-[150px] cursor-pointer"
                value={filterData.fuelType}
                onChange={handleChange}
                >
                    <option value="">All</option>
                    <option value="Petrol">Petrol</option>
                    <option value="Diesel">Diesel</option>
                    <option value="Electric">Electric</option>
                    <option value="Hybrid">Hybrid</option>
                </select>
                </div>
            </div>

            </div>
            <div className="flex flex-wrap justify-center items-center gap-5 mt-5">
                {filterData.category !== "" && 
                  <div className="flex flex-row justify-center items-center gap-3 bg-gray-200 px-2 py-1 rounded-[5px]"><p>Categorie : <strong>{filterData.category}</strong></p> <div 
                  className="font-bold text-gray-500 cursor-pointer"
                  onClick={()=>setFilterData({
                    ...filterData,
                    category : ""
                  })}>&#10005;</div></div>
                }

                {filterData.seats !== 0 && 
                  <div className="flex flex-row justify-center items-center gap-3 bg-gray-200 px-2 py-1 rounded-[5px]"><p>Seats: <strong>{filterData.seats}</strong></p> <div 
                  className="font-bold text-gray-500 cursor-pointer"
                  onClick={()=>setFilterData({
                    ...filterData,
                    seats : 0
                  })}>&#10005;</div></div>
                }

                {filterData.transmission !== "" && 
                  <div className="flex flex-row justify-center items-center gap-3 bg-gray-200 px-2 py-1 rounded-[5px]"><p>Transmission : <strong>{filterData.transmission}</strong></p> <div 
                  className="font-bold text-gray-500 cursor-pointer"
                  onClick={()=>setFilterData({
                    ...filterData,
                    transmission : ""
                  })}>&#10005;</div></div>
                }

                {filterData.fuelType !== "" && 
                  <div className="flex flex-row justify-center items-center gap-3 bg-gray-200 px-2 py-1 rounded-[5px]"><p>Fuel Type : <strong>{filterData.fuelType}</strong></p> <div
                  className="font-bold text-gray-500 cursor-pointer"
                  onClick={
                      
                    ()=>setFilterData({
                    ...filterData,
                    fuelType : ""
                  })}>&#10005;</div></div>
                }

                {(filterData.fuelType !== "" || filterData.seats !== 0 || filterData.category !== "" || filterData.transmission !== "") && 
                    <div className="flex flex-row justify-center items-center gap-3 bg-gray-200 px-2 py-1 rounded-[5px] font-bold cursor-pointer" onClick={()=>setFilterData({
                                  seats : 0,
            category : "",
            transmission : "",
            fuelType : ""
                    })}><i className="fa-solid fa-rotate-right mr-1"></i> <p className="text-[14px]">Reset Filters</p></div>
                }
            </div>
        </div>
    )
}

export default memo(FilterComponent);