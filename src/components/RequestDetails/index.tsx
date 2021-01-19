import React from "react";
import { Request } from "../../db/repositories/requests";
import styled from "styled-components";
import { SubTitle, Text, Wrapper } from "../../styles";
import CircularProgress from "../CircularProgress";

interface RequestDetailsProps {
  data?: Request;
}

const RequestDetails = ({ data }: RequestDetailsProps) => {
  return (
    <StyledWrapper>
      <Header>
        <SubTitle>Urls Encontrados</SubTitle>
      </Header>
      {data ? (
        <Content>
          <Details>
            <DetailsText>
              Palavra Chave:
              <Text style={{ marginLeft: 9 }}>{data?.keyword}</Text>
            </DetailsText>
            <DetailsText>
              Status: <Text style={{ marginLeft: 9 }}>{data?.status}</Text>
            </DetailsText>
          </Details>
          <UrlBox>
            {data.urls.map((url, index) => (
              <Url key={index} href={url}>
                {url}
              </Url>
            ))}
          </UrlBox>
        </Content>
      ) : (
        <CircularProgress size={100} />
      )}
    </StyledWrapper>
  );
};

const Header = styled(Wrapper)`
  height: 63px;
  width: 100%;
  justify-content: center;
  border: 1px solid var(--base-color-border);
  border-left: none;
  border-right: none;
  border-top: none;
`;

const DetailsText = styled.div`
  font-family: Montserrat;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 20px;
  display: flex;
`;

const Details = styled(Wrapper)`
  width: 100%;
  flex-direction: column;
  align-items: flex-start;
  margin: 27px 0;
`;

const UrlBox = styled(Wrapper)`
  width: 100%;
  height: 180px;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px grey;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: #8c8c8c;
    border-radius: 10px;
  }

  @media (max-width: 600px) {
    height: 150px;
  }
`;

const Url = styled.a`
  margin-top: 15px;
`;

const Content = styled(Wrapper)`
  width: 100%;
  flex-direction: column;
  align-items: flex-start;
`;

const StyledWrapper = styled(Wrapper)`
  flex-direction: column;
  justify-content: flex-start;
  height: 100%;
  width: 50%;
  box-shadow: var(--base-color-shadow) 0px 4px 10px 0px;
  border-radius: 50px;
  padding: 37px 65px;
  margin: 0 60px;

  @media (max-width: 1080px) {
    width: 100%;
    margin: 17px 0;
  }
`;

export default RequestDetails;
