import Loading from "./Loading";
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";

const Profile = () => {
  const { user } = useAuth0();
  const [profileReviews, setProfileReviews] = useState([]);
  const [profileReviewsLoading, setProfileReviewsLoading] = useState("loading");

  useEffect(() => {
    fetch(`/api/user-reviews/${user.sub}`)
    .then(res => res.json())
    .then(data => {
        if(data.status === 200){
          setProfileReviews(data.data);
          setProfileReviewsLoading("idle");
        } else{
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
      <ImageAndGreeting>
        <UserImage src={user.picture} alt={user.name} />
        <Greeting>Hi, {user.given_name}.</Greeting>
      </ImageAndGreeting>
      <Name>{user.name}</Name>
      <Email>{user.email}</Email>
      <Reviews>Reviews</Reviews>
      {profileReviewsLoading !== "loading" ? (profileReviews.length !== 0 ? (
        <ReviewSectionWrapper>
          {profileReviews.map((review) => {
            return (
              <ReviewWrapper key={review._id}>
                <ReviewTitle>{review.title}</ReviewTitle>
                <ReviewRating>{ratingToStars(review)}</ReviewRating>
                <ReviewAuthor>by {review.name}</ReviewAuthor>
                <ReviewBody>{review.review}</ReviewBody>
              </ReviewWrapper>
            );
          })}
        </ReviewSectionWrapper>
      ) : (
        <NoReviews>No reviews to display</NoReviews>
      )) : (
      <LoadingWrapper>
       <Loading/>
      </LoadingWrapper>
      )}
    </Wrapper>
  );
};

export default Profile;

const Email = styled.div`
    font-size: 1.5rem;
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

const LoadingWrapper = styled.div`
  
`;

const Name = styled.div`
    font-size: 2rem;
    font-weight: bold;
    margin: 10px 0;
`;

const NoReviews = styled.div`
  margin: 20px 0;
`;

const Reviews = styled.div`
    font-size: 1.75rem;
    font-weight: bold;
    margin-top: 50px;
`;

const ReviewAuthor = styled.div`
  margin: 5px 0;
`;

const ReviewBody = styled.div`
  margin: 40px 0 5px 0;
`;

const ReviewsHeader = styled.div`
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 20px;
`;

const ReviewRating = styled.div`
  margin: 5px 0;
`;

const ReviewSectionWrapper = styled.div`
  border: 2px solid black;
  margin: 30px 0;
  padding: 30px 20px 0 20px;
`;

const ReviewTitle = styled.div`
  font-weight: bold;
`;

const ReviewWrapper = styled.div`
  border-bottom: 1px solid lightgray;
  padding: 5px 0;
  &:last-child{
    border-bottom: none;
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
