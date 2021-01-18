import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { PageWrapper, StyledLink, Text, Wrapper, Title } from "../../styles";
import ActionButton from "../../components/ActionButton";
import RequestDetails from "../../components/RequestDetails";
import Table from "../../components/Table";
import { observer } from "mobx-react";
import { requestState } from "../../states/RequestState";
import useRefresh from "../../hooks/useRefresh";
import { useHistory } from "react-router-dom";
import * as request from "../../db/repositories/requests";
import { ReactComponent as ReturnIcon } from "../../assets/return-icon.svg";
import { ReactComponent as RefreshIcon } from "../../assets/refresh-icon.svg";

const Requests = observer(() => {
  const history = useHistory();
  const redirectPath = "/requests";
  const refresh = useRefresh(history, redirectPath);

  const [requests, setRequests] = useState<request.Request[]>();
  const [refreshFlag, setRefreshFlag] = useState(true);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState(false);
  const [filter, setFilter] = useState("");
  const [selectedRequest, setSelectedRequest] = useState<request.Request>();
  const [lastRefresh, setLastRefresh] = useState(0);

  useEffect(() => {
    fetchRequests();
    setRefreshFlag(false);
    setLastRefresh(0);
  }, [refreshFlag]);

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
      <Header>
        <Wrapper>
          <StyledLink to="/">
            <ReturnIcon style={{ marginTop: 10 }} />
          </StyledLink>
          <HeaderTitle>Requisições</HeaderTitle>
        </Wrapper>
      </Header>
      <StyledWrapper>
        <RequestsWrapper>
          <RefreshWrapper>
            <ActionButton
              color={"secondary"}
              onClick={() => {
                setRefreshFlag(true);
              }}
            >
              <RefreshIcon />
              <Text style={{ color: "var(--base-color-text)" }}>Refresh</Text>
            </ActionButton>
            <Text>Última atualização à {lastRefresh} min</Text>
          </RefreshWrapper>
          <Table data={requests} setFilter={setFilter} />
        </RequestsWrapper>
        <RequestDetails data={selectedRequest} />
      </StyledWrapper>
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
  justify-content: flex-start;
  width: 100%;
  padding-left: 20px;
  margin-bottom: 25px;
`;

const RequestsWrapper = styled(Wrapper)`
  height: 100%;
  justify-content: flex-start;
  flex-direction: column;

  div > button {
    transition: display 1s ease;
    margin-right: 17px;
    
    > p {
      font-weight: "bold",
      color: var(--base-color-white);
      margin-left: 24px;
      display: none;
    }

    :hover {
      > p {
        display: flex;
      }
    }
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
  height: 84vh;
  justify-content: flex-start;
  padding: 0 117px;
  margin-top: 36px;

  @media (max-width: 1080px) {
    height: 100%;
    padding: 0 20px;
  }
`;

const Header = styled(PageWrapper)`
  justify-content: space-between;
  flex-direction: row;
  width: 100%;
  height: 58px;

  @media (max-width: 600px) {
    align-items: flex-start;
  }
`;

export default Requests;
