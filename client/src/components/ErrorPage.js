import styled from "styled-components";

const ErrorPage = () => {
  return (
    <Wrapper>
      <ErrorMessage>
        Error: the page you are looking for cannot be found
      </ErrorMessage>
    </Wrapper>
  );
};

export default ErrorPage;

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
  background-image: url("https://res.cloudinary.com/dlfu6niut/image/upload/v1654815015/error-image_jyocjs.jpg");
  background-size: cover;
  display: flex;
  height: 540px;
  justify-content: center;
  width: 100vw;
`;
