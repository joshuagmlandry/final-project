import { AiOutlineLoading } from "react-icons/ai";
import styled, { keyframes } from "styled-components";

const Loading = () => {
  return (
    <Wrapper>
      <SpinningLoader />
    </Wrapper>
  );
};

export default Loading;

const spin = keyframes`
    from{
        transform: rotate(0deg);
    } to{
        transform: rotate(360deg);
    }
`;

const SpinningLoader = styled(AiOutlineLoading)`
  animation: ${spin} 1s linear infinite;
  font-size: 2rem;
  color: var(--color-dark-green);
  padding: 10px;
`;

const Wrapper = styled.div`
  display: flex;
  height: 90px;
  justify-content: center;
  margin: 20px 0;
`;
