import { createContext, useEffect, useState } from "react";

export const FilterContext = createContext(null);

export const FilterProvider = ({children})=>{

    const [filterProvince, setFilterProvince] = useState("");
    const [filterPark, setFilterPark] = useState("");
    const [provinces, setProvinces] = useState([]);
    const [provincesLoading, setProvincesLoading] = useState("loading");

    useEffect(()=>{
        fetch("/api/provinces")
        .then(res => res.json())
        .then(data => {
            setProvinces(data);
            setProvincesLoading("idle");
        })
    }, []);

    return(
        <FilterContext.Provider value={{filterProvince, setFilterProvince, filterPark, setFilterPark, provinces, setProvinces, provincesLoading, setProvincesLoading}}>
            {children}
        </FilterContext.Provider>
    );
}