import { createContext, useState } from "react";

export const FilterContext = createContext(null);

export const FilterProvider = ({children})=>{

    const [filterProvince, setFilterProvince] = useState("");
    const [filterPark, setFilterPark] = useState("");

    return(
        <FilterContext.Provider value={{filterProvince, setFilterProvince, filterPark, setFilterPark}}>
            {children}
        </FilterContext.Provider>
    );
}