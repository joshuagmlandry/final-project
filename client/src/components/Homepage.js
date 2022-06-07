import bgImage from "../assets/homepage-image.jpg";
import FeaturedHomepage from "./FeaturedHomepage";
import styled from "styled-components";
import { AiOutlineSearch } from "react-icons/ai";
import { GiCampfire, GiCampingTent, GiForestCamp } from "react-icons/gi";
import { useContext } from "react";
import { FilterContext } from "./FilterContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Homepage = () => {

  const {provinces, provincesLoading} = useContext(FilterContext);
  const [selectedProvince, setSelectedProvince] = useState('');
  const navigate = useNavigate();

  const changeHandler = (e)=>{
    setSelectedProvince(e.target.value);
  }

  const submitHandler = (e)=>{
    e.preventDefault();
    const searchedProvince = provinces.data.filter(province => {
      return province.name === selectedProvince;
    });
    navigate(`/province/${searchedProvince[0].abbr}`);
  }

  return (
    <>
    {provincesLoading !== "loading" ? (
    <Wrapper>
      <SearchArea>
        <div>
          <SearchBar onSubmit={submitHandler}>
            <SearchLabel>Find campsites in:</SearchLabel>
            <Select defaultValue={"blank"} onChange={changeHandler}>
              <Option disabled value={"blank"}>
                {" "}
              </Option>
              {provinces.data.map((province, index) => {
                return <Option key={`${province.name}-${index}`}>{province.name}</Option>;
              })}
            </Select>
            <SearchButton>
              <SearchIcon />
            </SearchButton>
          </SearchBar>
        </div>
      </SearchArea>
      <MainBody>
      <BodyHeader>Camping made easy</BodyHeader>
      <BodyText>Browse top-rated campsites across Canada</BodyText>
      <MainFeatures>
        <Feature>
          <FeatureIcon>
          <GiCampfire />
          </FeatureIcon>
          <FeatureHeader>Learn</FeatureHeader>
          <FeatureText>Read campsite reviews from across the Parks Canada network.</FeatureText>
        </Feature>
        <Feature>
          <FeatureIcon>
          <GiCampingTent />
          </FeatureIcon>
          <FeatureHeader>Contribute</FeatureHeader>
          <FeatureText>Add your own reviews to share your experience.</FeatureText>
        </Feature>
        <Feature>
          <FeatureIcon>
          <GiForestCamp/>
          </FeatureIcon>
          <FeatureHeader>Engage</FeatureHeader>
          <FeatureText>Join the Loon community for exclusive features.</FeatureText>
        </Feature>
      </MainFeatures>
      </MainBody>
      <FeaturedHomepage />
    </Wrapper>      
    ) : " "}
    </>
  );
};

export default Homepage;

const BodyHeader = styled.div`
  color: var(--color-dark-green);
  font-family: var(--font-header);
  font-size: 3rem;
  margin: 40px 0 20px;
`;

const BodyText = styled.div`
  font-family: var(--font-body);
  font-size: 2rem;
  margin-bottom: 40px;
`;

const Feature = styled.div`
  align-items: center;
  border-right: 2px solid lightgray;
  display: flex;
  flex-direction: column;
  padding: 20px;
  text-align: center;
  width: 250px;
  &:last-of-type{
    border: none;
  }
`;

const FeatureHeader = styled.div`
  color: var(--color-dark-green);
  font-family: var(--font-header);
  font-size: 3rem;
  font-weight: bold;
  padding-bottom: 20px;
`;

const FeatureIcon = styled.div`
  color: var(--color-dark-green);
  font-size: 5rem;
`;

const FeatureText = styled.div`
  font-family: var(--font-body);
`;

const MainBody = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const MainFeatures = styled.div`
  display: flex;
  margin: 100px 0;
`;

const Option = styled.option``;

const SearchArea = styled.div`
  align-items: center;
  background-image: url(${bgImage});
  background-position: 0 -130px;
  background-size: 100%;
  display: flex;
  height: 500px;
  justify-content: center;
  width: 100vw;
`;

const SearchBar = styled.form`
  align-items: center;
  background-color: rgba(255, 255, 255, 0.92);
  border-radius: 50px;
  display: flex;
  font-family: var(--font-body);
  font-size: 1.5rem;
  padding: 20px;
  transition: 200ms;
`;

const SearchButton = styled.button`
  background: none;
  border: none;
  &:hover {
    cursor: pointer;
  }
`;

const SearchIcon = styled(AiOutlineSearch)`
  background-color: var(--color-dark-green);
  border-radius: 50%;
  color: var(--color-light-beige);
  font-size: 2rem;
  padding: 10px;
  transition: 200ms;
  &:hover {
    background-color: var(--color-green);
  }
`;

const SearchLabel = styled.label`
  padding-top: 2px;
`;

const Select = styled.select`
  appearance: none;
  background-color: transparent;
  border: none;
  border-bottom: 1px solid black;
  font-family: var(--font-body);
  font-size: 1.5rem;
  margin: 0 10px;
  padding: 2px;
  text-align: center;
  width: fit-content;
  &:hover {
    cursor: pointer;
  }
`;

const Wrapper = styled.div`
  height: fit-content;
`;
