import styled from "styled-components";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { FilterContext } from "./FilterContext";
import { useContext, useState } from "react";
const { v4: uuidv4 } = require("uuid");

// Button that allows logged in users to add campsites to their list of favourites

const AddToFavourites = ({ user, queriedCampsite }) => {
  let id = uuidv4();
  const { favourites, favouritesLoading, newFav, setNewFav } =
    useContext(FilterContext);

  const [addedToFav, setAddedToFav] = useState(false);

  const favouriteHandler = (e) => {
    e.preventDefault();
    fetch("https://infinite-cove-65259.herokuapp.com/api/add-to-favourites", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: id,
        user: user.sub,
        campsite: queriedCampsite,
        favourite: true,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          setAddedToFav(true);
          setNewFav(!newFav);
        }
      });
  };

  return (
    <>
      {favouritesLoading !== "loading" ? (
        favourites.length !== 0 ? (
          <Wrapper>
            <AddButton
              disabled={
                addedToFav ||
                favourites.filter((fav) => {
                  return (
                    fav.campsite.Unique_Site_ID ===
                      queriedCampsite.Unique_Site_ID && fav.favourite
                  );
                }).length !== 0
              }
              onClick={favouriteHandler}
            >
              <div>
                {addedToFav ||
                favourites.filter((fav) => {
                  return (
                    fav.campsite.Unique_Site_ID ===
                      queriedCampsite.Unique_Site_ID && fav.favourite
                  );
                }).length !== 0
                  ? "Favourited"
                  : "Add to Favourites"}
              </div>{" "}
              {addedToFav ||
              favourites.filter((fav) => {
                return (
                  fav.campsite.Unique_Site_ID ===
                    queriedCampsite.Unique_Site_ID && fav.favourite
                );
              }).length !== 0 ? (
                <FilledHeart />
              ) : (
                <Heart />
              )}
            </AddButton>
          </Wrapper>
        ) : (
          <Wrapper>
            <AddButton
              disabled={
                addedToFav ||
                favourites.filter((fav) => {
                  return (
                    fav.campsite.Unique_Site_ID ===
                      queriedCampsite.Unique_Site_ID && fav.favourite
                  );
                }).length !== 0
              }
              onClick={favouriteHandler}
            >
              <div>{addedToFav ? "Favourited" : "Add to Favourites"}</div>{" "}
              {addedToFav ? <FilledHeart /> : <Heart />}
            </AddButton>
          </Wrapper>
        )
      ) : (
        ""
      )}
    </>
  );
};

export default AddToFavourites;

const AddButton = styled.button`
  align-items: center;
  background-color: var(--color-dark-green);
  border: none;
  border-radius: 5px;
  color: var(--color-light-beige);
  display: flex;
  font-family: var(--font-body);
  font-size: 1rem;
  justify-content: center;
  margin: 10px 0;
  padding: 10px;
  transition: 200ms;
  width: 200px;
  &:hover {
    background-color: var(--color-green);
    cursor: pointer;
  }
  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

const FilledHeart = styled(FaHeart)`
  margin: 0 10px;
`;

const Heart = styled(FaRegHeart)`
  margin: 0 10px;
`;

const Wrapper = styled.div`
  display: flex;
  margin: 40px 0 20px;
`;
