import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  PageWrapper,
  StyledLink,
  Text,
  Wrapper,
  Title,
  SubTitle,
} from "../../styles";
import ActionButton from "../../components/ActionButton";
import RequestDetails from "../../components/RequestDetails";
import Table from "../../components/Table";
import { observer } from "mobx-react";
import { requestState } from "../../states/RequestState";
import * as request from "../../db/repositories/requests";
import { ReactComponent as ReturnIcon } from "../../assets/return-icon.svg";
import { ReactComponent as RefreshIcon } from "../../assets/refresh-icon.svg";
import useRequest, { Endpoint } from "../../hooks/useRequest";
import Modal from "../../components/Modal";
import CircularProgress from "../../components/CircularProgress";

const getCrawlingResults: Endpoint = {
  service: "crawl",
};

const Requests = observer(() => {
  const [requests, setRequests] = useState<request.Request[]>();
  const [refreshFlag, setRefreshFlag] = useState(true);
  const [runCrawlRequest, isRequestLoading] = useRequest();
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState(false);
  const [filter, setFilter] = useState("");
  const [selectedRequest, setSelectedRequest] = useState<request.Request>();
  const [lastRefresh, setLastRefresh] = useState(0);
  const [openModal, setOpenModal] = useState(true);

  useEffect(() => {
    fetchRequests();
  }, []);

  useEffect(() => {
    async function updateRequestsList() {
      if (requests) {
        requests.forEach((req: request.Request) => {
          updateRequestProgress(req.id!);
        });
        fetchRequests();
      }
    }
    async function updateRequestProgress(id: string) {
      const requestProgress = await getApiRequestProgress(id);
      if (requestProgress) {
        const { status, urls } = requestProgress;
        console.log("Request Progress", requestProgress); //PRINT
        request.update(id, { status, urls });
      }
    }

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

    updateRequestsList();
    setRefreshFlag(false);
    setLastRefresh(0);
  }, [refreshFlag, runCrawlRequest]);

  useEffect(() => {
    function timer() {
      setTimeout(() => setLastRefresh(lastRefresh + 1), 60000);
    }
    timer();
  });

  useEffect(() => {
    if (requests) {
      if (requestState.id) {
        const [currentRequest] = requests?.filter(
          ({ id }: request.Request) => requestState.id === id
        );
        setSelectedRequest(currentRequest);
      } else {
        const [firstRequest] = requests.slice(0, 1);
        setSelectedRequest(firstRequest);
      }
    }
  }, [requests]);

  useEffect(() => {
    if (requests && filter !== "") {
      const [currentRequest] = requests.filter(
        ({ id }: request.Request) => filter === id
      );
      if (currentRequest) {
        setSelectedRequest(currentRequest);
      } else {
        const [firstRequest] = requests.slice(0, 1);
        setSelectedRequest(firstRequest);
      }
      setOpenModal(true);
    }
  }, [filter, requests]);

  async function fetchRequests() {
    setLoading(true);

    // Clean the requests array first
    setRequests([]);

    // Fetch requests from repository
    const _requests = await request.get();

    if (_requests) {
      // Set requests to state
      setRequests(_requests);
      setFetchError(false);
      setLoading(false);
    } else {
      setFetchError(true);
      setLoading(false);
    }
  }

  return (
    <PageContent>
      <Modal
        title={"Urls Encontrados"}
        open={openModal}
        onClose={() => setOpenModal(false)}
      >
        {selectedRequest ? (
          <Content>
            <Details>
              <DetailsText>
                Palavra Chave:
                <Text style={{ marginLeft: 9 }}>
                  {selectedRequest?.keyword}
                </Text>
              </DetailsText>
              <DetailsText>
                Status:{" "}
                <Text style={{ marginLeft: 9 }}>{selectedRequest?.status}</Text>
              </DetailsText>
            </Details>
            <UrlBox>
              {selectedRequest.urls.map((url, index) => (
                <Url key={index} href={url}>
                  {url}
                </Url>
              ))}
            </UrlBox>
          </Content>
        ) : (
          <CircularProgress size={100} />
        )}
      </Modal>
      {/* <StyledWrapper> */}
      <Wrapper style={{ justifyContent: "space-between" }}>
        <StyledLink to="/">
          <ReturnIcon style={{ marginTop: 10 }} />
        </StyledLink>
        <HeaderTitle>Requisições</HeaderTitle>
        <RefreshWrapper>
          <Text>Última atualização à {lastRefresh} min</Text>
          <ActionButton
            color={"secondary"}
            onClick={() => {
              setRefreshFlag(true);
            }}
          >
            <Text style={{ color: "var(--base-color-text)" }}>Refresh</Text>
            <RefreshIcon />
          </ActionButton>
        </RefreshWrapper>
      </Wrapper>
      <RequestsWrapper>
        <Table data={requests} setFilter={setFilter} />
      </RequestsWrapper>
      {/* </StyledWrapper> */}
    </PageContent>
  );
});

const HeaderTitle = styled(Title)`
  margin: 0 17px;

  @media (max-width: 850px) {
    font-size: 1.8rem;
  }
`;

const RefreshWrapper = styled(Wrapper)`
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
`;

const RequestsWrapper = styled(Wrapper)`
  height: 100%;
  width: 50%;
  justify-content: flex-start;
  flex-direction: column;
  }

  @media (max-width: 1080px) {
    width: 100%;
  }
`;

const StyledWrapper = styled(Wrapper)`
  width: 100%;
  margin-top: 57px;

  @media (max-width: 1080px) {
    flex-direction: column;
  }
`;

const PageContent = styled(PageWrapper)`
  height: 100%;
  justify-content: flex-start;
  padding: 0 117px;
  margin-top: 36px;
  /* align-items: flex-start; */

  @media (max-width: 1080px) {
    padding: 0 20px;
  }
`;

const DetailsText = styled.div`
  font-family: Montserrat;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 20px;
  display: flex;
`;

const Details = styled.div`
  width: 100%;
  /* flex-direction: column;
  align-items: flex-start; */
  margin: 27px 0;
`;

const UrlBox = styled.div`
  width: 100%;
  height: 65%;
  display: grid;
  overflow-y: auto;
  overflow-wrap: anywhere;

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

const Url = styled.a`
  margin-top: 15px;
`;

const Content = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export default Requests;
