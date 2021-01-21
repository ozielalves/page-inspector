import React, { useEffect } from "react";
import styled from "styled-components";
import { PageWrapper, StyledLink, Text, Title } from "../../styles";
import KeywordForm from "../../components/KeywordForm";
import ActionButton from "../../components/ActionButton";
import { lastRequestState } from "../../states/LastRequestState";

const Home = () => {
  useEffect(() => {
    lastRequestState.setApiId("");
    lastRequestState.setKeyword("");
  }, []);

  return (
    <PageContent>
      <TextContainer>
        <Title>Faça uma Inspeção</Title>
        <Subtitle>
          A palavra chave cadastrada será submetida a um serviço de web
          crawling. É possível acompanhar o status de solicitações anteriores
          clicando em consultar solicitaçãoes.
        </Subtitle>
      </TextContainer>
      <KeywordForm />
      <StyledLink to="/requests">
        <ActionButton color={"primary"}>
          <Text style={{ fontWeight: "bold" }}>Consultar solicitações</Text>
        </ActionButton>
      </StyledLink>
    </PageContent>
  );
};

const PageContent = styled(PageWrapper)`
  height: 100%;
  justify-content: center;

  @media (max-width: 600px) {
    padding: 0 20px;
    height: 80vh;
  }
`;

const TextContainer = styled(PageWrapper)`
  justify-content: center;
  width: 100%;
  height: 20%;
  max-width: 608px;
  min-height: 136px;

  @media (max-width: 600px) {
    align-items: flex-start;
  }
`;

const Subtitle = styled(Text)`
  margin-top: 17px;
  text-align: center;

  @media (max-width: 600px) {
    text-align: left;
  }
`;

export default Home;
