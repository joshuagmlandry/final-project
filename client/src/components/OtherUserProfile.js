import Loading from "./Loading";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

// Profile for the other verified users.  Name, email, and bio are shown as well as the user's reviews that they have left.

const OtherUserProfile = () => {
  const userNickName = useParams();
  const navigate = useNavigate();
  const [profileReviews, setProfileReviews] = useState([]);
  const [profileReviewsLoading, setProfileReviewsLoading] = useState("loading");
  const [loggedInUser, setLoggedInUser] = useState([]);
  const [loggedInUserLoading, setLoggedInUserLoading] = useState("loading");
  const [bioUpdate, setBioUpdate] = useState(false);

  useEffect(() => {
    fetch(`https://infinite-cove-65259.herokuapp.com/api/get-other-user/${userNickName.id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 400) {
          navigate("/");
        }
        setLoggedInUser(data.data);
        setLoggedInUserLoading("idle");
      });
  }, [bioUpdate]);

  useEffect(() => {
    fetch(`https://infinite-cove-65259.herokuapp.com/api/other-user-reviews/${userNickName.id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          setProfileReviews(data.data);
          setProfileReviewsLoading("idle");
        } else {
          setProfileReviewsLoading("idle");
        }
      });
  }, []);

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

  return (
    <Wrapper>
      {loggedInUserLoading !== "loading" ? (
        <>
          <ImageAndGreeting>
            <UserImage src={loggedInUser.picture} alt={loggedInUser.name} />
          </ImageAndGreeting>
          <Name>{loggedInUser.name}</Name>
          <Bio>{loggedInUser.bio !== null ? loggedInUser.bio : ""}</Bio>
        </>
      ) : (
        <Loading />
      )}

      {profileReviewsLoading !== "loading" ? (
        profileReviews.length !== 0 ? (
          <>
            <ReviewsAndFavourites>Reviews</ReviewsAndFavourites>
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
                  </IndividualReview>
                );
              })}
            </ReviewSectionWrapper>
          </>
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

export default OtherUserProfile;

const Bio = styled.div`
  color: lightgray;
  font-size: 1.5rem;
  font-style: italic;
  margin: 10px 0;
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
