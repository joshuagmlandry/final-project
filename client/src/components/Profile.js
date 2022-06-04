import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";

const Profile = () => {
  const { user } = useAuth0();

  return (
    <Wrapper>
      <ImageAndGreeting>
        <UserImage src={user.picture} alt={user.name} />
        <Greeting>Hi, {user.given_name}.</Greeting>
      </ImageAndGreeting>
      <Name>{user.name}</Name>
      <Email>{user.email}</Email>
      <Reviews>Reviews</Reviews>
    </Wrapper>
  );
};

export default Profile;

const Email = styled.div`
    font-size: 1.5rem;
`;

const Greeting = styled.div`
    color: var(--color-dark-green);
    font-family: var(--font-header);
    font-size: 3rem;
`;

const ImageAndGreeting = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const Name = styled.div`
    font-size: 2rem;
    font-weight: bold;
    margin: 10px 0;
`;

const Reviews = styled.div`
    font-size: 1.75rem;
    font-weight: bold;
    margin-top: 50px;
`;

const UserImage = styled.img`
  border: 4px solid var(--color-dark-green);
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 50px 75px;
`;
