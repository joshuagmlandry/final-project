import Loading from "./Loading";
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Profile = () => {
  const { user } = useAuth0();
  const [profileReviews, setProfileReviews] = useState([]);
  const [profileReviewsLoading, setProfileReviewsLoading] = useState("loading");
  const [deletedStatus, setDeletedStatus] = useState({});

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

  const deleteHandler = (e, id)=>{
    e.preventDefault();
    fetch("/api/delete-review", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: id
      }),
    })
    .then(res => res.json())
    .then(data => {
      if (data.status === 200){
        setDeletedStatus({...deletedStatus, _id: id, flag: true});
      }
    })
  }

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
              <IndividualReview>
                <ReviewWrapper key={review._id}>
                  <ReviewLocation><StyledLink target="_blank" to={`/campsite/${review.campsite.Unique_Site_ID}`}>{review.campsite.Unique_Site_ID}</StyledLink> ({review.campsite.place_name}, {review.campsite.region_name})</ReviewLocation>
                  <ReviewTitle>{review.title}</ReviewTitle>
                  <ReviewRating>{ratingToStars(review)}</ReviewRating>
                  <ReviewAuthor>by {review.name}</ReviewAuthor>
                  <ReviewBody>{review.review}</ReviewBody>
                </ReviewWrapper>
                <DeleteButton disabled={deletedStatus._id === review._id} onClick={(e)=>{deleteHandler(e, review._id)}}>{deletedStatus._id === review._id ? "Deleting" : "Delete"}</DeleteButton>    
              </IndividualReview>
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

const DeleteButton = styled.button`
  background-color: darkred;
  border: none;
  border-radius: 5px;
  color: white;
  font-family: var(--font-body);
  font-size: 1rem;
  margin: 10px 0;
  padding: 10px;
  width: 100px;
  transition: 200ms;
  &:hover {
    background-color: red;
    cursor: pointer;
  }
  &:disabled{
    background-color: lightgrey;
    cursor: not-allowed;
  }
`;

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

const IndividualReview = styled.div`
  align-items: flex-start;
  display: flex;
  border-bottom: 1px solid lightgray;
  justify-content: space-between;
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
  word-wrap: break-word;
  width: 800px;
`;

const ReviewsHeader = styled.div`
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 20px;
`;

const ReviewLocation = styled.div`
  padding: 10px 0;
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
  
  padding-bottom: 5px;
  &:last-child{
    border-bottom: none;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  &:hover{
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
