import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import { FilterContext } from "./FilterContext";

const DisplayReviews = () => {
  const { allReviews, allReviewsLoading } = useContext(FilterContext);
  const [randomReviews, setRandomReviews] = useState([]);
  const randomArray = [];

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
    if (allReviewsLoading !== "loading") {
      for (let i = 0; i < 5; i++) {
        randomArray.push(allReviews[Math.floor(1000 * Math.random())]);
      }
      setRandomReviews(randomArray);
    }
  }, [allReviewsLoading]);

  return (
    <>
      {allReviewsLoading !== "loading" ? (
        <Wrapper>
            <ReviewsHeader>
            Reviews
            </ReviewsHeader>
          {randomReviews.map((review) => {
            return (
              <ReviewWrapper key={review._id}>
                <ReviewTitle>{review.title}</ReviewTitle>
                <ReviewRating>{ratingToStars(review)}</ReviewRating>
                <ReviewAuthor>by {review.name}</ReviewAuthor>
                <ReviewBody>{review.review}</ReviewBody>
              </ReviewWrapper>
            );
          })}
        </Wrapper>
      ) : (
        ""
      )}
    </>
  );
};

export default DisplayReviews;

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
  margin: 5px 0;`;

const ReviewTitle = styled.div`
  font-weight: bold;
`;

const ReviewWrapper = styled.div`
  border-top: 1px solid lightgray;
  padding: 5px 0;
`;

const Wrapper = styled.div`
  border: 2px solid black;
  margin: 30px 0;
  padding: 30px 20px 0 20px;
`;
