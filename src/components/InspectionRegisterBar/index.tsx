import React, { FormEvent } from "react";
import styled from "styled-components";
import { ReactComponent as SearchIcon } from "../../assets/search-icon.svg";
import { ContainerWrapper, Input, Text } from "../../styles";
import ActionButton from "../ActionButton";
import CircularProgress from "../CircularProgress";

interface InspectionRegisterProps {
  setKeyword: React.Dispatch<React.SetStateAction<string>>;
  keyword: string;
  handleSubmit: (e: FormEvent) => void;
  emptySubmission: boolean;
  formatError: boolean;
  isLoading: boolean;
  setFormatError: React.Dispatch<React.SetStateAction<boolean>>;
}

const InspectionRegisterBar = ({
  keyword,
  setKeyword,
  handleSubmit,
  emptySubmission,
  isLoading,
  formatError,
  setFormatError,
}: InspectionRegisterProps) => {
  function handleChange(Event: React.ChangeEvent<HTMLInputElement>) {
    const { value } = Event.target;
    if (value.length >= 4) {
      setFormatError(false);
    }
    setKeyword(value);
  }

  return (
    <StyledForm onSubmit={handleSubmit}>
      <StyledWrapper className={emptySubmission ? "shake" : ""}>
        <SearchIcon className="search-icon" />
        <StyledInput
          id="key"
          type="text"
          name="key"
          minLength={4}
          placeholder="Digite uma palavra chave"
          autoComplete="off"
          autoCapitalize="off"
          value={keyword}
          onChange={handleChange}
          onInvalid={() => setFormatError(true)}
        />
        {!isLoading ? (
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
        <InputError>
          A palavra chave precisa ter pelo menos 4 caracteres
        </InputError>
      )}
    </StyledForm>
  );
};

export const InputError = styled.div`
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

export default InspectionRegisterBar;
