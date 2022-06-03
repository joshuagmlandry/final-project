import { Link } from "react-router-dom";
import styled from "styled-components";

const NavBar = ()=>{
 return (
     <Wrapper>
         <LoonLogo to="/">Loon</LoonLogo>
         <Links>
            <NavBarLink to="/browse">Browse</NavBarLink>
         </Links>
     </Wrapper>
 );
}

export default NavBar;

const LoonLogo = styled(Link)`
    color: var(--color-light-beige);
    font-family: var(--font-header);
    font-size: 3.5rem;
    font-weight: 500;
    margin: 20px;
    text-decoration: none;
`;

const Links = styled.div`

`;

const NavBarLink = styled(Link)`
    border-radius: 20px;
    color: var(--color-light-beige);
    font-family: var(--font-body);
    font-size: 1.25rem;
    margin: 8px;
    padding: 12px;
    text-decoration: none;
    transition: 200ms;
    &:hover{
        background-color: var(--color-green);
    }
`;

const Wrapper = styled.div`
    align-items: center;
    background-color: var(--color-dark-green);
    display: flex;
    height: 100px;
    justify-content: space-between;
`;