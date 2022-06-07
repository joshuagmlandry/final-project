import esriConfig from "@arcgis/core/config";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import { createContext, useEffect, useState } from "react";
const { REACT_APP_ARCGIS_API } = process.env;

export const FilterContext = createContext(null);

export const FilterProvider = ({children})=>{

    const [filterProvince, setFilterProvince] = useState("");
    const [filterPark, setFilterPark] = useState("");
    const [provinces, setProvinces] = useState([]);
    const [provincesLoading, setProvincesLoading] = useState("loading");
    const [parkDescriptions, setParkDescriptions] = useState([]);
    const [parkDescriptionsLoading, setParkDescriptionsLoading] = useState("loading");
    const [allReviews, setAllReviews] = useState([]);
    const [allReviewsLoading, setAllReviewsLoading] = useState("loading");
    const [postAdded, setPostAdded] = useState(false);
    // const [allCampsites, setAllCampsites] = useState(null);
    // const [allCampsitesLoading, setAllCampsitesLoading] =
      useState("loading");

    useEffect(()=>{
        fetch("/api/provinces")
        .then(res => res.json())
        .then(data => {
            setProvinces(data);
            setProvincesLoading("idle");
        })
    }, []);


    useEffect(()=>{
        fetch("/api/park-descriptions")
        .then(res => res.json())
        .then(data => {
            setParkDescriptions(data.data);
            setParkDescriptionsLoading("idle");
        })
    }, []);

    useEffect(()=>{
        fetch('/api/all-reviews')
        .then(res => res.json())
        .then(data => {
            setAllReviews(data.data);
            setAllReviewsLoading("idle");
        });
    }, []);

    return(
        <FilterContext.Provider value={{filterProvince, setFilterProvince, filterPark, setFilterPark, provinces, setProvinces, provincesLoading, setProvincesLoading, allReviews, allReviewsLoading, postAdded, setPostAdded, parkDescriptions, parkDescriptionsLoading}}>
            {children}
        </FilterContext.Provider>
    );
}