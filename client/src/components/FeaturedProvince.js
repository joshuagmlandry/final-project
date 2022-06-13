import Loading from "./Loading";
import styled from "styled-components";
import { FilterContext } from "./FilterContext";
import { useContext } from "react";

// Shows a random park, description, and mock review for the selected province

const FeaturedProvince = ({ prov }) => {
  const {
    allReviews,
    allReviewsLoading,
    parkDescriptions,
    parkDescriptionsLoading,
  } = useContext(FilterContext);

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

  if (
    prov.place.length !== 0 &&
    parkDescriptionsLoading !== "loading" &&
    allReviewsLoading !== "loading"
  ) {
    const randomFeaturedPlace =
      prov.place[Math.floor(prov.place.length * Math.random())];
    const matchedParkInfo = parkDescriptions.filter((park) => {
      return park.name === randomFeaturedPlace;
    })[0];
    const randomReview = allReviews[Math.floor(1000 * Math.random())];
    return (
      <FeatureWrapper>
        <MainHeader>Featured Park or Place</MainHeader>
        <Subheader>(images and descriptions from Parks Canada)</Subheader>
        <div>
          {parkDescriptionsLoading !== "loading" ? (
            <FeaturedPark>
              <FeaturedParkLink
                target={"_blank"}
                href={matchedParkInfo.parksCanLink}
              >
                {randomFeaturedPlace}
              </FeaturedParkLink>
              <FeaturedParkImg
                src={matchedParkInfo.imgSrc}
                alt={`Image of ${randomFeaturedPlace}`}
              />
              <FeaturedParkDescription>
                {matchedParkInfo.description}
              </FeaturedParkDescription>
            </FeaturedPark>
          ) : (
            <Loading />
          )}
        </div>
        <div>
          {allReviewsLoading !== "loading" ? (
            <FeaturedPark>
              <FeaturedParkHeader>Top Review</FeaturedParkHeader>
              <ReviewTitle>{randomReview.title}</ReviewTitle>
              <ReviewRating>{ratingToStars(randomReview)}</ReviewRating>
              <ReviewAuthor>
                by <Bold>{randomReview.name}</Bold> ({randomReview.time})
              </ReviewAuthor>
              <ReviewBody>{randomReview.review}</ReviewBody>
            </FeaturedPark>
          ) : (
            <Loading />
          )}
        </div>
      </FeatureWrapper>
    );
  } else {
    if (
      parkDescriptionsLoading !== "loading" &&
      allReviewsLoading !== "loading"
    ) {
      return (
        <NoCampsites>
          There are unfortunately no campsites available in this
          province/territory.
        </NoCampsites>
      );
    } else {
      return <Loading />;
    }
  }
};

export default FeaturedProvince;

const Bold = styled.span`
  font-weight: bold;
`;

const FeaturedPark = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 40px;
  width: 500px;
`;

const FeaturedParkDescription = styled.div`
  font-family: var(--font-body);
`;

const FeaturedParkHeader = styled.div`
  font-family: var(--font-body);
  font-size: 1.5rem;
  font-weight: bold;
  margin: 10px 0;
`;

const FeaturedParkImg = styled.img`
  border: 2px solid var(--color-dark-green);
  border-radius: 2px;
  height: 90px;
  margin: 10px 0;
  width: 180px;
`;

const FeaturedParkLink = styled.a`
  color: black;
  font-family: var(--font-body);
  font-size: 1.5rem;
  font-weight: bold;
  margin: 10px 0;
  text-decoration: none;
  &:hover {
    color: var(--color-green);
    cursor: pointer;
  }
`;

const FeatureWrapper = styled.div`
  border: 3px solid var(--color-dark-green);
  border-radius: 4px;
  padding: 40px 40px 10px;
`;

const MainHeader = styled.div`
  color: var(--color-dark-green);
  font-family: var(--font-header);
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 5px;
  text-align: center;
`;

const NoCampsites = styled.div`
  font-family: var(--font-body);
  font-size: 2.5rem;
  text-align: justify;
  width: 500px;
`;

const ReviewAuthor = styled.div`
  margin: 5px 0;
`;

const ReviewBody = styled.div`
  margin: 10px 0;
  word-wrap: break-word;
`;

const ReviewRating = styled.div`
  margin: 5px 0;
`;

const ReviewTitle = styled.div`
  font-weight: bold;
  font-size: 1.1rem;
  margin-top: 10px;
`;

const Subheader = styled.div`
  color: var(--color-dark-green);
  font-family: var(--font-header);
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 50px;
  text-align: center;
`;
