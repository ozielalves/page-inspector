import styled from "styled-components";
import { Link } from "react-router-dom";

export const Title = styled.h1`
  font-family: Montserrat;
  font-style: normal;
  font-weight: bold;
  font-size: 48px;
  line-height: 59px;

  @media (max-width: 600px) {
    text-align: left;
    font-size: 1.8rem;
  }
`;

export const Text = styled.p`
  font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 20px;
`;

export const SubTitle = styled(Text)`
  font-weight: bold;
  font-size: 26.6967px;
  line-height: 33px;

  @media (max-width: 600px) {
    font-size: 1.2rem;
  }
`;

export const StyledLink = styled(Link)`
  text-decoration: none;

  @media(max-width: 320px) {
    display: none;
  }
`;

export const PageWrapper = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  .shake {
    animation: shake 0.5s;
  }

  @keyframes shake {
    0% {
      transform: translate(1px, 1px) rotate(0deg);
    }
    10% {
      transform: translate(-1px, -2px) rotate(-1deg);
    }
    20% {
      transform: translate(-3px, 0px) rotate(1deg);
    }
    30% {
      transform: translate(3px, 2px) rotate(0deg);
    }
    40% {
      transform: translate(1px, -1px) rotate(1deg);
    }
    50% {
      transform: translate(-1px, 2px) rotate(-1deg);
    }
    60% {
      transform: translate(-3px, 1px) rotate(0deg);
    }
    70% {
      transform: translate(3px, 1px) rotate(-1deg);
    }
    80% {
      transform: translate(-1px, -1px) rotate(1deg);
    }
    90% {
      transform: translate(1px, 2px) rotate(0deg);
    }
    100% {
      transform: translate(1px, -2px) rotate(-1deg);
    }
  }
`;

export const ContainerWrapper = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const WrapperColumn = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const Input = styled.input`
  width: 100%;
  flex: 1 1 0%;
  align-self: stretch;
  outline: none;
  border: none;
  padding: 0px 8px;
  font-size: 1.6rem;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.75;
  letter-spacing: normal;
  background: transparent;
`;

export const TableItemContent = styled(ContainerWrapper)`
  width: 100%;
  min-width: 410px;
  height: 53px;
  align-items: center;
  border-radius: 50px;
  padding: 9px 72px;
  box-shadow: var(--base-color-shadow) 0px 4px 10px 0px;
  justify-content: space-between;

  @media (max-width: 600px) {
    margin: 0 17px;
    min-width: 250px;
    padding: 9px 36px;
  }
`;

export const TableCell = styled(Wrapper)`
  max-width: 80%;
  min-width: 20%;
  justify-content: flex-start;

  p {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    margin-right: 20px;
  }
`;
