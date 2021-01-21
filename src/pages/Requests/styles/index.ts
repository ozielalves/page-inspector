import styled from "styled-components";
import { Title, Wrapper } from "../../../styles";

export const HeaderTitle = styled(Title)`
  margin: 0 17px;

  @media (max-width: 850px) {
    font-size: 1.8rem;
  }
  @media (max-width: 300px) {
    margin: 0;
  }
`;

export const PageHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

export const RefreshWrapper = styled(Wrapper)`
  justify-content: flex-end;
  padding-left: 20px;

  div > button {
    transition: display 1s ease;
    margin-left: 17px;
    padding: 10px 20px;
    
    > p {
      font-weight: "bold",
      color: var(--base-color-white);
      margin-right: 24px;
      display: none;
    }

    :hover {
      > p {
        display: flex;
      }
    }
  }
  
  @media (max-width: 600px) {
    p {
      display: none;
    }
    div > button {  
      :hover {
        > p {
          display: none;
        }
      }
  }

  @media (max-width: 320px) {
    div > button {
      margin-left: 0px;
    }
  }
`;

export const PageContent = styled.div`
  height: 76%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 0 117px;
  margin-top: 36px;
  align-items: flex-start;

  @media (max-width: 1080px) {
    padding: 0 10px;
  }
`;

export const DetailsText = styled.div`
  font-family: Montserrat;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 20px;
  color: var(--base-color-grey);
  display: flex;
`;

export const Details = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 27px 0 10px 0;

  .button-rotate {
    animation: rotation 4s infinite linear;
  }

  @keyframes rotation {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

export const UrlBox = styled.div`
  width: 100%;
  height: 65%;
  display: grid;
  overflow-y: auto;
  overflow-wrap: anywhere;
  padding-right: 10px;
  align-content: flex-start;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px transparent;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: #8c8c8c;
    border-radius: 10px;
  }
`;

export const Url = styled.a`
  margin-top: 15px;
`;

export const Content = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
