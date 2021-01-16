import React, { FormEvent, useState } from "react";
import styled from "styled-components";
import { PageWrapper, StyledLink, Text } from "../../styles";
import InspectionRegisterBar from "../../components/InspectionRegisterBar";
import ActionButton from "../../components/ActionButton";
import useRequest, { Endpoint } from "../../hooks/useRequest";

const postKeyWord: Endpoint = {
  service: "crawl",
  method: "POST",
};

interface Keyword {
  keyword: string;
}

const Home = () => {
  const [keyword, setKeyword] = useState("");
  const [runCrawlRequest] = useRequest();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const response = await runCrawlRequest<Keyword>(postKeyWord, {
      params: {
        data: { keyword },
      },
    });

    if (response.error) {
      console.log(response.error);
      return;
    }

    /* enqueueSnackbar(`Lista de itens de Sell Through cadastrada com sucesso`, {
      variant: 'success',
    }); */

    /* goToSellThroughPage(); */
  };

  return (
    <PageContent>
      <TextContainer>
        <Title>Faça uma Inspeção</Title>
        <Subtitle>
          A palavra chave cadastrada será submetida a um serviço de web
          crawling. É possível acompanhar o status da solicitação clicando em
          consultar solicitaçãoes.
        </Subtitle>
      </TextContainer>
      <InspectionRegisterBar
        handleSubmit={handleSubmit}
        keyword={keyword}
        setKeyword={setKeyword}
      />
      <StyledLink to="/">
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
  padding: 123px 0 123px 0;

  @media (max-width: 600px) {
    padding: 0 20px;
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

const Title = styled.h1`
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

const Subtitle = styled(Text)`
  margin-top: 17px;
  text-align: center;

  @media (max-width: 600px) {
    text-align: left;
  }
`;

export default Home;
