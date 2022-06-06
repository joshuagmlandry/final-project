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
        fetch('/api/all-reviews')
        .then(res => res.json())
        .then(data => {
            setAllReviews(data.data);
            setAllReviewsLoading("idle");
        });
    }, []);

    // useEffect(() => {
    //     esriConfig.apiKey = REACT_APP_ARCGIS_API;
    //     const campsites = new FeatureLayer({
    //       // url: "https://services2.arcgis.com/wCOMu5IS7YdSyPNx/ArcGIS/rest/services/Accommodation_Hebergement_V2_2/FeatureServer/0",
    //       url: "https://services2.arcgis.com/wCOMu5IS7YdSyPNx/ArcGIS/rest/services/Campsites_Join/FeatureServer/0",
    //     });
    //     const query = campsites.createQuery();
    //     // query.where = `Unique_Site_ID = *`;
    //     query.outFields = [
    //       "region_name",
    //       "place_name",
    //       "Unique_Site_ID",
    //     ];
    //     campsites.queryFeatures(query).then(async (data) => {
    //       await setAllCampsites(data.features.map(entry => {
    //           return entry.attributes;
    //       }));
    //       setAllCampsitesLoading("idle");
    //     });
    //   }, []);

    return(
        <FilterContext.Provider value={{filterProvince, setFilterProvince, filterPark, setFilterPark, provinces, setProvinces, provincesLoading, setProvincesLoading, allReviews, allReviewsLoading, postAdded, setPostAdded}}>
            {children}
        </FilterContext.Provider>
    );
}