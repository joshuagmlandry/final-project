import styled from "styled-components";
import { useContext } from "react";
import { FilterContext } from "./FilterContext";

// Shows photos and descriptions (from Parks Canada) for various parks and places.  Links to the Parks Canada webpages are also included.

const FeaturedHomepage = () => {
  const { parkDescriptions, parkDescriptionsLoading } =
    useContext(FilterContext);
  const featuredParks = [];

  if (parkDescriptionsLoading !== "loading") {
    const parkDescriptionsCopy = [...parkDescriptions];
    for (let i = 0; i < 5; i++) {
      let randomIndex = Math.floor(parkDescriptionsCopy.length * Math.random());
      featuredParks.push(parkDescriptionsCopy[randomIndex]);
      parkDescriptionsCopy.splice(randomIndex, 1);
    }
  }

  return (
    <Wrapper>
      <MainHeader>Featured Parks and Places</MainHeader>
      <FeaturedParkWrapper>
        {featuredParks.map((park, index) => {
          return (
            <ParkWrapper key={`${index}${park}`}>
              <div>
                <ParkHeader target={"_blank"} href={park.parksCanLink}>
                  {park.name}
                </ParkHeader>
              </div>
              <ParkImg src={park.imgSrc} />
              <ParkDescription>{park.description}</ParkDescription>
            </ParkWrapper>
          );
        })}
      </FeaturedParkWrapper>
    </Wrapper>
  );
};

export default FeaturedHomepage;

const MainHeader = styled.div`
  color: var(--color-dark-green);
  font-family: var(--font-header);
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 50px;
`;

const ParkDescription = styled.div`
  font-family: var(--font-body);
  font-size: 0.9rem;
  text-align: justify;
`;

const ParkImg = styled.img`
  border: 2px solid var(--color-dark-green);
  border-radius: 2px;
  height: 90px;
  margin: 20px 0;
  width: 180px;
`;

const ParkHeader = styled.a`
  color: black;
  font-family: var(--font-body);
  font-size: 1.25rem;
  font-weight: bold;
  text-decoration: none;
  &:hover {
    color: var(--color-green);
    cursor: pointer;
  }
`;

const ParkWrapper = styled.div`
  margin: 0 10px;
  width: 250px;
`;

const FeaturedParkWrapper = styled.div`
  align-items: flex-start;
  display: flex;
  justify-content: center;
  text-align: center;
`;

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 50px 0;
`;
