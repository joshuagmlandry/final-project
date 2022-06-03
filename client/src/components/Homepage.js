import bgImage from "../assets/homepage-image.jpg";
import NavBar from "./NavBar";
import styled from "styled-components";
import { AiOutlineSearch } from "react-icons/ai";

const Homepage = () => {
  const provinces = [
    "Alberta",
    "British Columbia",
    "Manitoba",
    "New Brunswick",
    "Newfoundland & Labrador",
    "Northwest Territories",
    "Nova Scotia",
    "Nunavut",
    "Ontario",
    "Prince Edward Island",
    "Quebec",
    "Saskatchewan",
    "Yukon",
  ];

  return (
    <Wrapper>
      <NavBar />
      <SearchArea>
        <div>
          <SearchBar>
            <SearchLabel>Find campsites in:</SearchLabel>
            <Select defaultValue={"blank"}>
              <Option disabled value={"blank"}>
                {" "}
              </Option>
              {provinces.map((province, index) => {
                return <Option key={`${province}-${index}`}>{province}</Option>;
              })}
            </Select>
            <SearchButton>
              <SearchIcon />
            </SearchButton>
          </SearchBar>
        </div>
      </SearchArea>
    </Wrapper>
  );
};

export default Homepage;

const Option = styled.option`
  &:first-of-type {
    color: red;
  }
`;

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

const Wrapper = styled.div``;
