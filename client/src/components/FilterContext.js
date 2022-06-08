import { createContext, useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export const FilterContext = createContext(null);

export const FilterProvider = ({children})=>{

    const { user, isAuthenticated } = useAuth0();

    const [filterProvince, setFilterProvince] = useState("");
    const [filterPark, setFilterPark] = useState("");
    const [provinces, setProvinces] = useState([]);
    const [provincesLoading, setProvincesLoading] = useState("loading");
    const [favourites, setFavourites] = useState([]);
    const [favouritesLoading, setFavouritesLoading] = useState("loading");
    const [newFav, setNewFav] = useState(false);
    const [parkDescriptions, setParkDescriptions] = useState([]);
    const [parkDescriptionsLoading, setParkDescriptionsLoading] = useState("loading");
    const [allReviews, setAllReviews] = useState([]);
    const [allReviewsLoading, setAllReviewsLoading] = useState("loading");
    const [postAdded, setPostAdded] = useState(false);
    const [deletedFavStatus, setDeletedFavStatus] = useState({});
    // const [allCampsites, setAllCampsites] = useState(null);
    // const [allCampsitesLoading, setAllCampsitesLoading] =
      useState("loading");

    useEffect(()=>{
        fetch("/api/provinces")
        .then(res => res.json())
        .then(data => {
            setProvinces(data);
            setProvincesLoading("idle");
        });
    }, []);

    useEffect(()=>{
        if(isAuthenticated){
            fetch(`/api/get-favourites/${user.sub}`)
            .then(res => res.json())
            .then(data => {
                setFavourites(data.data);
                setFavouritesLoading("idle");
            });
        }
    }, [isAuthenticated, newFav, deletedFavStatus]);

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
        <FilterContext.Provider value={{filterProvince, setFilterProvince, filterPark, setFilterPark, provinces, setProvinces, provincesLoading, setProvincesLoading, allReviews, allReviewsLoading, postAdded, setPostAdded, parkDescriptions, parkDescriptionsLoading, favourites, favouritesLoading, newFav, setNewFav, deletedFavStatus, setDeletedFavStatus}}>
            {children}
        </FilterContext.Provider>
    );
}