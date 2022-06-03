import styled from "styled-components";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <Wrapper>
      <SocialIcons>
        <Facebook />
        <Instagram />
        <Twitter />
      </SocialIcons>
      <Copyright>© 2022 Loon</Copyright>
    </Wrapper>
  );
};

export default Footer;


const Copyright = styled.div`
    margin: 5px;
`;

const Facebook = styled(FaFacebook)`
    border-radius: 50%;
    font-size: 1.5rem;
    margin: 4px;
    padding: 5px;
    transition: 200ms;
    &:hover{
        background-color: var(--color-green);
        cursor: pointer;
    }
`;

const Instagram = styled(FaInstagram)`
    border-radius: 50%;
    font-size: 1.5rem;
    margin: 4px;
    padding: 5px;
    transition: 200ms;
    &:hover{
        background-color: var(--color-green);
        cursor: pointer;
    }
`;

const SocialIcons = styled.div`
    margin: 5px;
`;

const Twitter = styled(FaTwitter)`
    border-radius: 50%;
    font-size: 1.5rem;
    margin: 4px;
    padding: 5px;
    transition: 200ms;
    &:hover{
        background-color: var(--color-green);
        cursor: pointer;
    }
`;

const Wrapper = styled.div`
    align-items: center;
  background-color: var(--color-dark-green);
  color: var(--color-light-beige);
  display: flex;
  flex-direction: column;
  font-family: var(--font-body);
  height: 100px;
  justify-content: center;
`;
