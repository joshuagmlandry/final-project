import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";

const ProfileIcon = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && (
      <Wrapper>
        <UserImage src={user.picture} alt={user.name} />
      </Wrapper>
    )
  );
};

export default ProfileIcon;

const UserImage = styled.img`
  background-blend-mode: multiply;
  border: 2px solid var(--color-light-beige);
  border-radius: 50%;
  height: 50px;
  &:hover {
    cursor: pointer;
  }
`;

const Wrapper = styled.div`
  border-radius: 50%;
  padding: 10px;
  &:hover {
    background-color: var(--color-green);
  }
`;
