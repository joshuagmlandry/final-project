import { useContext, useState } from "react";
import styled from "styled-components";
import { FilterContext } from "./FilterContext";

const FeaturedHomepage = ()=>{

    const {parkDescriptions, parkDescriptionsLoading} = useContext(FilterContext);
    const featuredParks = [];

    if(parkDescriptionsLoading !== "loading"){
        for(let i=0; i<5; i++){
            featuredParks.push(parkDescriptions[Math.floor(parkDescriptions.length * Math.random())]);
        }
    }

    return (
        <Wrapper>
        <MainHeader>Featured Parks and Places</MainHeader>
        <FeaturedParkWrapper>
            {featuredParks.map((park, index) => {
                return (
                    <ParkWrapper key={`${index}${park}`}>
                    <ParkHeader>{park.name}</ParkHeader>
                    <ParkImg src={park.imgSrc}/>
                    <ParkDescription>{park.description}</ParkDescription>                        
                    </ParkWrapper>
                );
            })}
        </FeaturedParkWrapper>        
        </Wrapper>

    );
}

export default FeaturedHomepage;

const MainHeader = styled.div`
    color: var(--color-dark-green);
    font-family: var(--font-header);
    font-size: 2.5rem;
    font-weight: bold;
    margin-bottom: 50px;
`;

const ParkDescription = styled.div`
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

const ParkHeader = styled.div`
    font-size: 1.25rem;
    font-weight: bold;
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