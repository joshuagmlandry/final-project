import Loading from "./Loading";
import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import { FilterContext } from "./FilterContext";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

// Display all reviews, which includes user submitted reviews as well as five random mock reviews.

const DisplayReviews = ({ userReviews, userReviewsLoading }) => {
  const { allReviews, allReviewsLoading, postAdded } =
    useContext(FilterContext);
  const [randomReviews, setRandomReviews] = useState([]);
  const randomArray = [];
  const { user, isAuthenticated } = useAuth0();
  let avgReview = 0;

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

  useEffect(() => {
    if (allReviewsLoading !== "loading" && userReviewsLoading !== "loading") {
      for (let i = 0; i < 5; i++) {
        randomArray.push(allReviews[Math.floor(1000 * Math.random())]);
      }
      setRandomReviews([...randomArray, ...userReviews]);
    }
  }, [allReviewsLoading, userReviewsLoading, postAdded]);

  return (
    <>
      {allReviewsLoading !== "loading" ? (
        <Wrapper>
          {randomReviews.forEach((review) => {
            avgReview += review.rating;
          })}
          {randomReviews.length !== 0 ? (
            <ReviewsHeader>
              Reviews ({randomReviews.length} reviews -{" "}
              {(avgReview / randomReviews.length).toFixed(2)}/5)
            </ReviewsHeader>
          ) : (
            <Loading />
          )}
          {randomReviews.map((review) => {
            return (
              <ReviewWrapper key={review._id}>
                <ReviewTitle>{review.title}</ReviewTitle>
                <ReviewRating>{ratingToStars(review)}</ReviewRating>
                <ReviewAuthor>
                  by{" "}
                  <Bold>
                    {review.nickname !== undefined &&
                    review.nickname !== "Guest" ? (
                      isAuthenticated && review.nickname === user.nickname ? (
                        <StyledLink to={`/profile`}>{review.name}</StyledLink>
                      ) : (
                        <StyledLink to={`/profile/${review.nickname}`}>
                          {review.name}
                        </StyledLink>
                      )
                    ) : (
                      review.name
                    )}
                  </Bold>{" "}
                  ({review.time})
                </ReviewAuthor>
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
            );
          })}
        </Wrapper>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default DisplayReviews;

const Bold = styled.span`
  font-weight: bold;
`;

const ReviewAuthor = styled.div`
  margin: 5px 0;
`;

const ReviewBody = styled.div`
  margin: 40px 0 5px 0;
  word-wrap: break-word;
`;

const ReviewsHeader = styled.div`
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 20px;
`;

const ReviewImg = styled.img`
  margin: 10px 0;
  max-width: 300px;
`;

const ReviewRating = styled.div`
  margin: 5px 0;
`;

const ReviewTitle = styled.div`
  font-weight: bold;
  font-size: 1.1rem;
`;

const ReviewWrapper = styled.div`
  border-top: 1px solid lightgray;
  padding: 5px 0;
`;

const StyledLink = styled(Link)`
  color: var(--color-green);
  text-decoration: none;
`;

const Wrapper = styled.div`
  border: 2px solid black;
  margin: 10px 75px;
  padding: 30px 20px 0 20px;
  width: 80%;
`;
