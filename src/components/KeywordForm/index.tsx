import React, { FormEvent, useState } from "react";
import styled from "styled-components";
import useRequest, { Endpoint } from "../../hooks/useRequest";
import { observer } from "mobx-react";
import { lastRequestState } from "../../states/LastRequestState";
import useRefresh from "../../hooks/useRefresh";
import { useHistory } from "react-router-dom";
import * as request from "../../db/repositories/requests";
import { ReactComponent as SearchIcon } from "../../assets/search-icon.svg";
import { ContainerWrapper, Input, Text } from "../../styles";
import ActionButton from "../ActionButton";
import CircularProgress from "../CircularProgress";

const postKeyWord: Endpoint = {
  service: "crawl",
  method: "POST",
};

const getCrawlingResults: Endpoint = {
  service: "crawl",
};

const KeywordForm = observer(() => {
  const history = useHistory();
  const redirectPath = "/requests";
  const goToRequests = useRefresh(history, redirectPath);

  const [keyword, setKeyword] = useState("");
  const [shakeForm, setShakeForm] = useState(false);
  const [formatError, setFormatError] = useState(false);
  const [runCrawlRequest, isRequestLoading] = useRequest();

  function validateKeywordInput(value: string) {
    return value.length > 3 && value.length < 33 && value !== "";
  }

  function handleChange(Event: React.ChangeEvent<HTMLInputElement>) {
    const { value } = Event.target;
    if (validateKeywordInput(value)) {
      setFormatError(false);
    }
    setKeyword(value);
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (validateKeywordInput(keyword)) {
      setShakeForm(false);
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
        lastRequestState.setKeyword(keyword);
        lastRequestState.setApiId(response.data.id);

        const crawling = await getApiRequestProgress(response.data.id!);
        // Get id from api
        if (crawling) {
          request.create({
            apiId: response.data.id,
            keyword,
            status: crawling.status,
            urls: crawling.urls,
          });
          setKeyword("");
          goToRequests();
        }
      }
    } else {
      setFormatError(true);
      setShakeForm(true);
      setTimeout(() => setShakeForm(false), 500);
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
    <StyledForm onSubmit={handleSubmit}>
      <StyledWrapper className={shakeForm ? "shake" : ""}>
        <SearchIcon className="search-icon" />
        <StyledInput
          id="keyword-input"
          type="text"
          name="keyword"
          placeholder="Digite uma palavra chave"
          autoComplete="off"
          autoCapitalize="off"
          value={keyword}
          onChange={handleChange}
        />
        {!isRequestLoading ? (
          <ActionButton color={"secondary"}>
            <Text
              style={{ fontWeight: "bold", color: "var(--base-color-text)" }}
            >
              Solicitar busca
            </Text>
            <SearchIcon
              style={{ color: "var(--base-color-white)" }}
              className="button-search-icon"
            />
          </ActionButton>
        ) : (
          <CircularProgress size={40} />
        )}
      </StyledWrapper>
      {formatError && (
        <InputError className="input-error">
          A palavra chave precisa ter entre 4 e 32 caracteres
        </InputError>
      )}
    </StyledForm>
  );
});

export const InputError = styled.span`
  bottom: 40px;
  width: 414px;
  font-size: 16px;
  line-height: 18px;
  color: var(--base-color-error);
  text-align: left;
  position: absolute;
  left: 30px;

  @media (max-width: 600px) {
    bottom: 25px;
    width: 300px;
  }

  @media (max-width: 320px) {
    bottom: 20px;
    width: 200px;
  }
`;

const StyledInput = styled(Input)`
  padding-left: 27px;
  font-size: 16px;

  @media (max-width: 600px) {
    padding-left: 0;
  }
`;

const StyledForm = styled.form`
  width: 50%;
  position: relative;

  @media (max-width: 1080px) {
    width: auto;
  }
`;

const StyledWrapper = styled(ContainerWrapper)`
  width: 100%;
  height: 74px;
  align-items: center;
  border-radius: 50px;
  padding: 9px 11.85px 9px 27px;
  box-shadow: var(--base-color-shadow) 0px 4px 10px 0px;
  margin: 82px 0 77px 0;

  .button-search-icon {
    display: none;
  }

  @media (max-width: 600px) {
    .search-icon {
      display: none;
    }
    .button-search-icon {
      display: flex;
    }
    div > button > p {
      display: none;
    }
  }
`;

export default KeywordForm;
