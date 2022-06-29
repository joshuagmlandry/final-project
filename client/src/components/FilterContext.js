import { createContext, useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

// Creates the state/state loading variables as well as runs several useEffects to prepare the data that will be needed throughout the application.

export const FilterContext = createContext(null);

export const FilterProvider = ({ children }) => {
  const { user, isAuthenticated } = useAuth0();

  const [filterProvince, setFilterProvince] = useState("");
  const [filterPark, setFilterPark] = useState("");
  const [provinces, setProvinces] = useState([]);
  const [provincesLoading, setProvincesLoading] = useState("loading");
  const [favourites, setFavourites] = useState([]);
  const [favouritesLoading, setFavouritesLoading] = useState("loading");
  const [newFav, setNewFav] = useState(false);
  const [deletedFavStatus, setDeletedFavStatus] = useState({});
  const [parkDescriptions, setParkDescriptions] = useState([]);
  const [parkDescriptionsLoading, setParkDescriptionsLoading] =
    useState("loading");
  const [allReviews, setAllReviews] = useState([]);
  const [allReviewsLoading, setAllReviewsLoading] = useState("loading");
  const [postAdded, setPostAdded] = useState(false);
  const [campgrounds, setCampgrounds] = useState({ name: null, array: null });

  useEffect(() => {
    fetch("https://infinite-cove-65259.herokuapp.com/api/provinces")
      .then((res) => res.json())
      .then((data) => {
        setProvinces(data);
        setProvincesLoading("idle");
      });
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetch("https://infinite-cove-65259.herokuapp.com/api/add-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: user,
        }),
      })
        .then((res) => res.json())
        .then((data) => {});
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated) {
      fetch(`https://infinite-cove-65259.herokuapp.com/api/get-favourites/${user.sub}`)
        .then((res) => res.json())
        .then((data) => {
          setFavourites(data.data);
          setFavouritesLoading("idle");
        });
    }
  }, [isAuthenticated, newFav, deletedFavStatus]);

  useEffect(() => {
    fetch("https://infinite-cove-65259.herokuapp.com/api/park-descriptions")
      .then((res) => res.json())
      .then((data) => {
        setParkDescriptions(data.data);
        setParkDescriptionsLoading("idle");
      });
  }, []);

  useEffect(() => {
    fetch("https://infinite-cove-65259.herokuapp.com/api/all-reviews")
      .then((res) => res.json())
      .then((data) => {
        setAllReviews(data.data);
        setAllReviewsLoading("idle");
      });
  }, []);

  return (
    <FilterContext.Provider
      value={{
        filterProvince,
        setFilterProvince,
        filterPark,
        setFilterPark,
        provinces,
        setProvinces,
        provincesLoading,
        setProvincesLoading,
        allReviews,
        allReviewsLoading,
        postAdded,
        setPostAdded,
        parkDescriptions,
        parkDescriptionsLoading,
        favourites,
        favouritesLoading,
        newFav,
        setNewFav,
        deletedFavStatus,
        setDeletedFavStatus,
        campgrounds,
        setCampgrounds,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};
