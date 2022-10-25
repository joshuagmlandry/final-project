import Loading from "./Loading";
import styled from "styled-components";
import UserBio from "./UserBio";
import { FilterContext } from "./FilterContext";
import { useAuth0 } from "@auth0/auth0-react";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Profile for the currently logged in user.  Name, email, and a modifiable bio are shown as well as the user's favourites and any reviews that they have left

const Profile = () => {
  const { user } = useAuth0();
  const [profileReviews, setProfileReviews] = useState([]);
  const [profileReviewsLoading, setProfileReviewsLoading] = useState("loading");
  const [loggedInUser, setLoggedInUser] = useState([]);
  const [loggedInUserLoading, setLoggedInUserLoading] = useState("loading");
  const [bioUpdate, setBioUpdate] = useState(false);
  const [deletedStatus, setDeletedStatus] = useState({});
  const {
    favourites,
    favouritesLoading,
    deletedFavStatus,
    setDeletedFavStatus,
  } = useContext(FilterContext);

  useEffect(() => {
    fetch(`https://infinite-cove-65259.herokuapp.com/api/get-user/${user.sub}`)
      .then((res) => res.json())
      .then((data) => {
        setLoggedInUser(data.data);
        setLoggedInUserLoading("idle");
      });
  }, [bioUpdate]);

  useEffect(() => {
    fetch(`https://infinite-cove-65259.herokuapp.com/api/user-reviews/${user.sub}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          setProfileReviews(data.data);
          setProfileReviewsLoading("idle");
        } else {
          setProfileReviewsLoading("idle");
        }
      });
  }, [deletedStatus]);

  const ratingToStars = (review) => {
    let starRating = "";
    switch (review.rating) {
      case 1:
        starRating = "⭐";
        return starRating;
      case 2:
        starRating = "⭐⭐";
        return starRating;
      case 3:
        starRating = "⭐⭐⭐";
        return starRating;
      case 4:
        starRating = "⭐⭐⭐⭐";
        return starRating;
      case 5:
        starRating = "⭐⭐⭐⭐⭐";
        return starRating;
      default:
        break;
    }
  };

  const deleteHandler = (e, id) => {
    e.preventDefault();
    fetch("https://infinite-cove-65259.herokuapp.com/api/delete-review", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          setDeletedStatus({ ...deletedStatus, _id: id, flag: true });
        }
      });
  };

  const deleteFavHandler = (e, id) => {
    e.preventDefault();
    fetch("https://infinite-cove-65259.herokuapp.com/api/delete-favourite", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          setDeletedFavStatus({ ...deletedFavStatus, _id: id, flag: true });
        }
      });
  };

  return (
    <Wrapper>
      <ImageAndGreeting>
        <UserImage src={user.picture} alt={user.name} />
        <Greeting>Hi, {user.given_name}.</Greeting>
      </ImageAndGreeting>
      <Name>{user.name}</Name>
      <Email>{user.email}</Email>
      <Bio>
        {loggedInUserLoading !== "loading" ? (
          <UserBio
            bioUpdate={bioUpdate}
            setBioUpdate={setBioUpdate}
            user={loggedInUser}
          />
        ) : (
          ""
        )}
      </Bio>
      <ReviewsAndFavourites>Favourites</ReviewsAndFavourites>
      {favouritesLoading !== "loading" ? (
        favourites.length !== 0 ? (
          <FavSectionWrapper>
            {favourites.map((fav) => {
              return (
                <IndividualReview key={fav._id}>
                  <ReviewLocation>
                    <StyledLink
                      target="_blank"
                      to={`/campsite/${fav.campsite.Unique_Site_ID}`}
                    >
                      {fav.campsite.Unique_Site_ID}
                    </StyledLink>{" "}
                    ({fav.campsite.place_name}, {fav.campsite.region_name})
                  </ReviewLocation>
                  <DeleteButton
                    disabled={deletedFavStatus._id === fav._id}
                    onClick={(e) => {
                      deleteFavHandler(e, fav._id);
                    }}
                  >
                    {deletedFavStatus._id === fav._id ? "Deleting" : "Delete"}
                  </DeleteButton>
                </IndividualReview>
              );
            })}
          </FavSectionWrapper>
        ) : (
          <NoReviews>No reviews to display</NoReviews>
        )
      ) : (
        <div>
          <Loading />
        </div>
      )}
      <ReviewsAndFavourites>Reviews</ReviewsAndFavourites>
      {profileReviewsLoading !== "loading" ? (
        profileReviews.length !== 0 ? (
          <ReviewSectionWrapper>
            {profileReviews.map((review) => {
              return (
                <IndividualReview key={review._id}>
                  <ReviewWrapper>
                    <ReviewLocation>
                      <StyledLink
                        target="_blank"
                        to={`/campsite/${review.campsite.Unique_Site_ID}`}
                      >
                        {review.campsite.Unique_Site_ID}
                      </StyledLink>{" "}
                      ({review.campsite.place_name},{" "}
                      {review.campsite.region_name})
                    </ReviewLocation>
                    <ReviewTitle>{review.title}</ReviewTitle>
                    <ReviewRating>{ratingToStars(review)}</ReviewRating>
                    <ReviewAuthor>by {review.name}</ReviewAuthor>
                    <ReviewBody>{review.review}</ReviewBody>
                    {review.media !== null && review.media !== undefined ? (
                      <ReviewImg
                        src={review.media.url}
                        alt={"User uploaded image"}
                      />
                    ) : (
                      ""
                    )}
                  </ReviewWrapper>
                  <DeleteButton
                    disabled={deletedStatus._id === review._id}
                    onClick={(e) => {
                      deleteHandler(e, review._id);
                    }}
                  >
                    {deletedStatus._id === review._id ? "Deleting" : "Delete"}
                  </DeleteButton>
                </IndividualReview>
              );
            })}
          </ReviewSectionWrapper>
        ) : (
          <NoReviews>No reviews to display</NoReviews>
        )
      ) : (
        <div>
          <Loading />
        </div>
      )}
    </Wrapper>
  );
};

export default Profile;

const Bio = styled.div`
  font-size: 1.5rem;
  margin: 10px 0;
`;

const DeleteButton = styled.button`
  background-color: darkred;
  border: none;
  border-radius: 5px;
  color: white;
  font-family: var(--font-body);
  font-size: 1rem;
  padding: 10px;
  width: 100px;
  transition: 200ms;
  &:hover {
    background-color: red;
    cursor: pointer;
  }
  &:disabled {
    background-color: lightgrey;
    cursor: not-allowed;
  }
`;

const Email = styled.div`
  font-size: 1.5rem;
`;

const FavSectionWrapper = styled.div`
  border: 2px solid black;
  margin: 30px 0 0;
  padding: 0px 20px;
`;

const Greeting = styled.div`
  color: var(--color-dark-green);
  font-family: var(--font-header);
  font-size: 3rem;
`;

const ImageAndGreeting = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const IndividualReview = styled.div`
  align-items: center;
  display: flex;
  border-bottom: 1px solid lightgray;
  justify-content: space-between;
  padding: 20px 0;
`;

const Name = styled.div`
  font-size: 2rem;
  font-weight: bold;
  margin: 10px 0;
`;

const NoReviews = styled.div`
  margin: 20px 0;
`;

const ReviewsAndFavourites = styled.div`
  font-size: 1.75rem;
  font-weight: bold;
  margin-top: 50px;
`;

const ReviewAuthor = styled.div`
  margin: 5px 0;
`;

const ReviewBody = styled.div`
  margin: 40px 0 5px 0;
  word-wrap: break-word;
  width: 800px;
`;

const ReviewImg = styled.img`
  margin: 10px 0;
  max-width: 300px;
`;

const ReviewLocation = styled.div`
  margin-bottom: 5px;
`;

const ReviewRating = styled.div`
  margin: 5px 0;
`;

const ReviewSectionWrapper = styled.div`
  border: 2px solid black;
  margin: 30px 0;
  padding: 0 20px;
`;

const ReviewTitle = styled.div`
  font-weight: bold;
`;

const ReviewWrapper = styled.div`
  padding-bottom: 5px;
  &:last-child {
    border-bottom: none;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  &:hover {
    cursor: pointer;
  }
`;

const UserImage = styled.img`
  border: 4px solid var(--color-dark-green);
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 50px 75px;
`;
