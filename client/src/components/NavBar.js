import LoginButton from "./Login";
import LogoutButton from "./Logout";
import ProfileIcon from "./ProfileIcon";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { slide as Menu } from 'react-burger-menu'
import { useAuth0 } from "@auth0/auth0-react";
import { useMediaQuery } from "react-responsive";
import { useState } from "react";

// Navigation bar that is used throughout the application

const NavBar = () => {
  const [menuState, setMenuState] = useState(false);
  const closeMenu = ()=>{
    setMenuState(false);
  }
  const handleIsOpen = () => {
    setMenuState(!menuState);
  }
  const { isAuthenticated } = useAuth0();
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 768px)",
  });
  const styles = {
    bmBurgerButton: {
      position: 'absolute',
      width: '36px',
      height: '20px',
      right: '20px',
      top: '40px',
    },
    bmBurgerBars: {
      background: `var(--color-light-beige)`
    },
    bmBurgerBarsHover: {
      background: '#a90000'
    },
    bmCrossButton: {
      height: '24px',
      width: '24px',
      position: 'absolute',
      top: '80px',
      right: '20px'
    },
    bmCross: {
      background: '#bdc3c7'
    },
    bmMenuWrap: {
      position: 'fixed',
      height: '100%'
    },
    bmMenu: {
      background: 'var(--color-dark-green)',
      padding: '20px 0 0',
      fontSize: '1.15em',
      position: 'absolute',
      top: '50px',
      width: '100%',
      height: '100%'
    },
    bmMorphShape: {
      fill: '#373a47'
    },
    bmItemList: {
      color: '#b8b7ad',
      padding: '0.8em'
    },
    bmItem: {
      display: 'inline-block'
    },
    bmOverlay: {
      background: 'rgba(0, 0, 0, 0.3)'
    }
  }
  
  return (
    <Wrapper>
      <LoonLogo to="/">Loon</LoonLogo>
      {isDesktopOrLaptop ? (
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
      ) : (
        <Menu isOpen={menuState} onOpen={handleIsOpen} onClose={handleIsOpen} right styles={ styles } width={ '100%' }>
        <Links>
        <MobileLink>
          <NavBarLink onClick={closeMenu} className="menu-item" to="/about">About</NavBarLink>
        </MobileLink>
        <MobileLink>
          <NavBarLink onClick={closeMenu} className="menu-item" to="/browse">Browse</NavBarLink>
        </MobileLink>
        <MobileLink>
          {!isAuthenticated ? (
            <LoginButton onClick={closeMenu} className="menu-item"/>
          ) : (
            <LoggedInOptions>
              <Link onClick={closeMenu} className="menu-item" to="/profile">
                <ProfileIcon />
              </Link>
              <LogoutButton onClick={closeMenu} className="menu-item"/>
            </LoggedInOptions>
          )}
        </MobileLink>
      </Links>
      </Menu>
      )}

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
  font-size: 2rem;
  font-weight: 500;
  margin: 20px;
  text-decoration: none;

  @media only screen and (min-width: 768px) {
    font-size: 3.5rem;
  }
`;

const Links = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
`;

const MobileLink = styled.div`
  margin-bottom: 40px;
`;

const NavBarLink = styled(Link)`
  border-radius: 20px;
  color: var(--color-light-beige);
  font-family: var(--font-body);
  font-size: 1.75rem;
  margin: 20px;
  padding: 12px;
  text-decoration: none;
  transition: 200ms;
  &:hover {
    background-color: var(--color-green);
  }
  @media only screen and (min-width: 768px) {
    font-size: 1.25rem;
    margin: 8px;
    padding: 12px;
  }
`;

const Wrapper = styled.div`
  align-items: center;
  background-color: var(--color-dark-green);
  display: flex;
  height: 100px;
  justify-content: space-between;
`;
