import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";

// Auth0 log out button

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <StyledButton onClick={() => logout({ returnTo: window.location.origin })}>
      Log out
    </StyledButton>
  );
};

export default LogoutButton;

const StyledButton = styled.button`
  background-color: var(--color-dark-green);
  border: none;
  border-radius: 20px;
  color: var(--color-light-beige);
  font-family: var(--font-body);
  font-size: 1.75rem;
  margin: 0 20px;
  padding: 12px;
  text-decoration: none;
  transition: 200ms;
  &:hover {
    background-color: var(--color-green);
    cursor: pointer;
  }
  @media only screen and (min-width: 768px) {
    font-size: 1.25rem;
    margin: 8px;
    padding: 12px;
  }
`;
