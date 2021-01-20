import React, { useEffect, useState } from "react";
import { StyledLink, Text, WrapperColumn } from "../../styles";
import {
  Content,
  Details,
  DetailsText,
  HeaderTitle,
  PageContent,
  PageHeader,
  RefreshWrapper,
  Url,
  UrlBox,
} from "./styles";
import ActionButton from "../../components/ActionButton";
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

interface ApiRequestResponse {
  id: string;
  status: string;
  urls: string[];
}

const Requests = observer(() => {
  const [requests, setRequests] = useState<request.Request[]>();
  const [refreshFlag, setRefreshFlag] = useState(true);
  const [runCrawlRequest] = useRequest();
  const [filter, setFilter] = useState("");
  const [selectedRequest, setSelectedRequest] = useState<request.Request>();
  const [lastRefresh, setLastRefresh] = useState(0);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    setRequests([]);
    fetchRequests();
  }, []);

  useEffect(() => {
    async function updateRequestsList() {
      const _requests = await request.get();
      if (_requests) {
        _requests.forEach((req: request.Request) => {
          updateRequestProgress(req.id!, req.apiId);
        });
        fetchRequests();
      }
    }
    async function updateRequestProgress(idRequest: string, apiId: string) {
      const requestProgress = await getApiRequestProgress(apiId);
      if (requestProgress) {
        const { id, status, urls } = requestProgress;
        request.update(idRequest, { apiId: id, status, urls });
      }
    }
    async function getApiRequestProgress(
      id: string
    ): Promise<ApiRequestResponse | undefined> {
      const response = await runCrawlRequest<ApiRequestResponse>(
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

    setRequests([]);
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
      if (requestState.apiId) {
        const [lastRequest] = requests.filter(
          ({ apiId }: request.Request) => apiId === requestState.apiId
        );
        setSelectedRequest(lastRequest);
        setOpenModal(true);
      }
    }
  }, [requests]);

  useEffect(() => {
    if (requests && filter !== "") {
      setFilter("");
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

  const handleDelete = (id: string) => {
    request.remove(id);
    setRefreshFlag(true);
  };

  async function fetchRequests() {
    // Fetch requests from repository
    const _requests = await request.get();

    if (_requests) {
      // Set requests to state
      setRequests(_requests);
    }
  }

  return (
    <PageContent>
      <Modal
        title={`${
          selectedRequest ? selectedRequest.urls.length : 0
        } urls encontrados`}
        open={openModal}
        onClose={() => setOpenModal(false)}
      >
        {selectedRequest ? (
          <Content>
            <Details>
              <ActionButton
                className={
                  selectedRequest.status === "active" ? "button-rotate" : ""
                }
                color={"secondary"}
                onClick={() => {
                  setRefreshFlag(true);
                }}
                style={{ width: "30%" }}
              >
                <RefreshIcon />
              </ActionButton>
              <WrapperColumn>
                <DetailsText>
                  Palavra Chave:
                  <Text
                    style={{
                      marginLeft: 9,
                      maxWidth: "75%",
                      overflowWrap: "anywhere",
                    }}
                  >
                    {selectedRequest?.keyword}
                  </Text>
                </DetailsText>
                <DetailsText style={{ marginTop: 16 }}>
                  Status:{" "}
                  <Text style={{ marginLeft: 9 }}>
                    {selectedRequest?.status}
                  </Text>
                </DetailsText>
              </WrapperColumn>
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
      <PageHeader>
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
            <Text style={{ color: "var(--base-color-text)" }}>Recarregar</Text>
            <RefreshIcon />
          </ActionButton>
        </RefreshWrapper>
      </PageHeader>
      <Table
        data={requests}
        setFilter={setFilter}
        handleDelete={handleDelete}
      />
    </PageContent>
  );
});

export default Requests;
