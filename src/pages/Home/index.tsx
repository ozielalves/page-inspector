import React, { FormEvent, useState } from "react";
import styled from "styled-components";
import { PageWrapper, StyledLink, Text, Title } from "../../styles";
import InspectionRegisterBar from "../../components/InspectionRegisterBar";
import ActionButton from "../../components/ActionButton";
import useRequest, { Endpoint } from "../../hooks/useRequest";
import { observer } from "mobx-react";
import { requestState } from "../../states/RequestState";
import useRefresh from "../../hooks/useRefresh";
import { useHistory } from "react-router-dom";
import * as request from "../../db/repositories/requests";

const postKeyWord: Endpoint = {
  service: "crawl",
  method: "POST",
};

const getCrawlingResults: Endpoint = {
  service: "crawl",
};

const Home = observer(() => {
  const history = useHistory();
  const redirectPath = "/requests";
  const goToRequests = useRefresh(history, redirectPath);

  const [keyword, setKeyword] = useState("");
  const [emptyFormSubmission, setEmptyFormSubmission] = useState(false);
  const [formatError, setFormatError] = useState(false);
  const [runCrawlRequest, isRequestLoading] = useRequest();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (keyword !== "" && keyword.length >= 4) {
      setEmptyFormSubmission(false);
      const response = await runCrawlRequest<request.Request>(postKeyWord, {
        params: {
          keyword,
        },
      });
      if (response.error) {
        console.log(response.error);
        return;
      }
      if (response.data?.id) {
        requestState.setKeyword(keyword);
        requestState.setId(response.data.id);

        const crawling = await getApiRequestProgress(response.data.id!);
        console.log(crawling);
        // Get id from api
        if (crawling) {
          request.create(response.data.id, {
            keyword,
            status: crawling.status,
            urls: crawling.urls,
          });
          setKeyword("");
          goToRequests();
        }
      }
    } else if (keyword.length < 4 && keyword !== "") {
      setFormatError(true);
    } else {
      setEmptyFormSubmission(true);
      setTimeout(() => setEmptyFormSubmission(false), 500);
    }
  };

  async function getApiRequestProgress(
    id: string
  ): Promise<request.Request | undefined> {
    const response = await runCrawlRequest<request.Request>(
      getCrawlingResults,
      {
        params: {
          id,
        },
      }
    );
    if (response.error) {
      console.log(response.error);
      return;
    }
    if (response.data) {
      return response.data;
    }
  }

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
        emptySubmission={emptyFormSubmission}
        keyword={keyword}
        setKeyword={setKeyword}
        isLoading={isRequestLoading}
        formatError={formatError}
        setFormatError={setFormatError}
      />
      <StyledLink to="/requests">
        <ActionButton color={"primary"}>
          <Text style={{ fontWeight: "bold" }}>Consultar solicitações</Text>
        </ActionButton>
      </StyledLink>
    </PageContent>
  );
});

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
