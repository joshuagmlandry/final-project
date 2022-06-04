import profileError from "../assets/profile-error.jpg";
import styled from "styled-components";

const ProfileError = ()=>{
    return (
        <Wrapper>
            <ErrorMessage>
                Error: you must sign up or sign in to view your profile
            </ErrorMessage>

        </Wrapper>
    );
}

export default ProfileError;

const ErrorMessage = styled.div`
  align-items: center;
  background-color: rgba(255, 255, 255, 0.92);
  border-radius: 50px;
  display: flex;
  justify-content: center;
  font-family: var(--font-body);
  font-size: 2rem;
  padding: 20px;
`;

const Wrapper = styled.div`
  align-items: center;
  background-image: url(${profileError});
  background-position: 0 -130px;
  background-size: 100%;
  display: flex;
  height: 540px;
  justify-content: center;
  width: 100vw;
`;