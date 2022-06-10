import LoginButton from "./Login";
import LogoutButton from "./Logout";
import ProfileIcon from "./ProfileIcon";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

// Navigation bar that is used throughout the application

const NavBar = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <Wrapper>
      <LoonLogo to="/">Loon</LoonLogo>
      <Links>
        <div>
          <NavBarLink to="/about">About</NavBarLink>
        </div>
        <div>
          <NavBarLink to="/browse">Browse</NavBarLink>
        </div>
        <div>
          {!isAuthenticated ? (
            <LoginButton />
          ) : (
            <LoggedInOptions>
              <Link to="/profile">
                <ProfileIcon />
              </Link>
              <LogoutButton />
            </LoggedInOptions>
          )}
        </div>
      </Links>
    </Wrapper>
  );
};

export default NavBar;

const LoggedInOptions = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
`;

const LoonLogo = styled(Link)`
  color: var(--color-light-beige);
  font-family: var(--font-header);
  font-size: 3.5rem;
  font-weight: 500;
  margin: 20px;
  text-decoration: none;
`;

const Links = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
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
  &:hover {
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
