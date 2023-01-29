import styled from "styled-components";

// Error message that shows up when you try to access user profiles when not authenticated

const ProfileError = () => {
  return (
    <Wrapper>
      <ErrorMessage>
        Error: you must sign up or sign in to view user profiles
      </ErrorMessage>
    </Wrapper>
  );
};

export default ProfileError;

const ErrorMessage = styled.div`
  align-items: center;
  background-color: rgba(255, 255, 255, 0.92);
  border-radius: 50px;
  display: flex;
  justify-content: center;
  font-family: var(--font-body);
  font-size: 1.5rem;
  padding: 20px;
  text-align: center;
  width: 80vw;
  @media only screen and (min-width: 768px) {
    font-size: 2rem;
  }
`;

const Wrapper = styled.div`
  align-items: center;
  background-image: url("https://res.cloudinary.com/dlfu6niut/image/upload/v1654815014/profile-error_cijhyy.jpg");
  background-size: cover;
  display: flex;
  height: 540px;
  justify-content: center;
  width: 100vw;
`;
