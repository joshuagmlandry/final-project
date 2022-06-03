import bgImage from "../assets/homepage-image.jpg";
import styled from "styled-components";
import { AiOutlineSearch } from "react-icons/ai";
import { useContext } from "react";
import { FilterContext } from "./FilterContext";

const Homepage = () => {

  const {provinces, provincesLoading} = useContext(FilterContext);

  return (
    <>
    {provincesLoading !== "loading" ? (
    <Wrapper>
      <SearchArea>
        <div>
          <SearchBar>
            <SearchLabel>Find campsites in:</SearchLabel>
            <Select defaultValue={"blank"}>
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
      </MainBody>
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

const MainBody = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
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
