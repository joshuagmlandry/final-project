import FeaturedHomepage from "./FeaturedHomepage";
import styled from "styled-components";
import { AiOutlineSearch } from "react-icons/ai";
import { FilterContext } from "./FilterContext";
import { GiCampfire, GiCampingTent, GiForestCamp } from "react-icons/gi";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

// Homepage which includes a search bar and the application's mission statement

const Homepage = () => {
  const { provinces, provincesLoading } = useContext(FilterContext);
  const [tabFlag, setTabFlag] = useState({ prov: false, campsite: true });
  const [selectedProvince, setSelectedProvince] = useState("");
  const navigate = useNavigate();

  const changeHandler = (e) => {
    setSelectedProvince(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const searchedProvince = provinces.data.filter((province) => {
      return province.name === selectedProvince;
    });
    navigate(`/province/${searchedProvince[0].abbr}`);
  };

  const campsiteSearchHandler = (e) => {
    e.preventDefault();
    navigate(`/campsite/${e.target[2].value.toUpperCase()}`);
  };

  const tabHandlerProv = (e) => {
    e.preventDefault();
    setTabFlag({ prov: false, campsite: true });
  };

  const tabHandlerCampsite = (e) => {
    e.preventDefault();
    setTabFlag({ prov: true, campsite: false });
  };

  return (
    <>
      {provincesLoading !== "loading" ? (
        <Wrapper>
          <SearchArea>
            <div hidden={tabFlag.prov}>
              <SearchBar onSubmit={submitHandler}>
                <SelectionTabs>
                  <Tab onClick={tabHandlerProv}>By province</Tab>
                  <Tab onClick={tabHandlerCampsite}>By campsite</Tab>
                </SelectionTabs>
                <SearchField>
                  <SearchLabel>Find campsites in:</SearchLabel>
                  <Select defaultValue={"blank"} onChange={changeHandler}>
                    <option disabled value={"blank"}>
                      {" "}
                    </option>
                    {provinces.data.map((province, index) => {
                      return (
                        <option key={`${province.name}-${index}`}>
                          {province.name}
                        </option>
                      );
                    })}
                  </Select>
                  <SearchButton>
                    <SearchIcon />
                  </SearchButton>
                </SearchField>
              </SearchBar>
            </div>
            <div hidden={tabFlag.campsite}>
              <SearchBar onSubmit={campsiteSearchHandler}>
                <SelectionTabs>
                  <Tab onClick={tabHandlerProv}>By province</Tab>
                  <Tab onClick={tabHandlerCampsite}>By campsite</Tab>
                </SelectionTabs>
                <SearchField>
                  <SearchLabel>Find a campsite:</SearchLabel>
                  <CampsiteInput></CampsiteInput>
                  <SearchButton>
                    <SearchIcon />
                  </SearchButton>
                </SearchField>
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
                <FeatureText>
                  Read campsite reviews from across the Parks Canada network.
                </FeatureText>
              </Feature>
              <Feature>
                <FeatureIcon>
                  <GiCampingTent />
                </FeatureIcon>
                <FeatureHeader>Contribute</FeatureHeader>
                <FeatureText>
                  Add your own reviews to share your experience.
                </FeatureText>
              </Feature>
              <Feature>
                <FeatureIcon>
                  <GiForestCamp />
                </FeatureIcon>
                <FeatureHeader>Engage</FeatureHeader>
                <FeatureText>
                  Join the Loon community for exclusive features.
                </FeatureText>
              </Feature>
            </MainFeatures>
          </MainBody>
          <FeaturedHomepage />
        </Wrapper>
      ) : (
        " "
      )}
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

const CampsiteInput = styled.input`
  border: none;
  border-bottom: 1px solid black;
  font-family: var(--font-body);
  font-size: 1.5rem;
  margin: 0 10px;
  padding: 2px;
  width: 310px;
`;

const Feature = styled.div`
  align-items: center;
  border-right: 2px solid lightgray;
  display: flex;
  flex-direction: column;
  padding: 20px;
  text-align: center;
  width: 250px;
  &:last-of-type {
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

const SearchArea = styled.div`
  align-items: center;
  background-image: url("https://res.cloudinary.com/dlfu6niut/image/upload/v1654815014/homepage-image_zhq6bw.jpg");
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
  flex-direction: column;
  font-family: var(--font-body);
  font-size: 1.5rem;
  padding: 20px;
  transition: 200ms;
  width: 630px;
`;

const SearchButton = styled.button`
  background: none;
  border: none;
  &:hover {
    cursor: pointer;
  }
`;

const SearchField = styled.div`
  align-items: center;
  display: flex;
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

const SelectionTabs = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const Tab = styled.button`
  background-color: inherit;
  border: none;
  font-family: var(--font-body);
  font-size: 1.25rem;
  padding: 0 30px;
  transition: 200ms;
  &:last-of-type {
    border-left: 1px solid lightgray;
  }
  &:hover {
    color: var(--color-dark-green);
    cursor: pointer;
  }
`;

const Wrapper = styled.div`
  height: fit-content;
`;
