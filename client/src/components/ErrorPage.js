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
  font-size: 2rem;
  padding: 20px;
`;

const Wrapper = styled.div`
  align-items: center;
  background-image: url("https://res.cloudinary.com/dlfu6niut/image/upload/v1654815015/error-image_jyocjs.jpg");
  background-position: 0 -130px;
  background-size: 100%;
  display: flex;
  height: 540px;
  justify-content: center;
  width: 100vw;
`;
