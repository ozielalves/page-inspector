import React, { FormEvent } from "react";
import styled from "styled-components";
import { ReactComponent as SearchIcon } from "../../assets/search-icon.svg";
import { ContainerWrapper, Input, Text } from "../../styles";
import Button from "../ActionButton";

interface InspectionRegisterProps {
  setKeyword: React.Dispatch<React.SetStateAction<string>>;
  keyword: string;
  handleSubmit: (e: FormEvent) => void;
}

const InspectionRegisterBar = ({
  keyword,
  setKeyword,
  handleSubmit,
}: InspectionRegisterProps) => {
  return (
    <form onSubmit={handleSubmit}>
      <StyledWrapper>
        <SearchIcon className="search-icon" />
        <StyledInput
          required
          id="key"
          type="text"
          name="key"
          placeholder="Digite uma palavra chave"
          autoComplete="off"
          autoCapitalize="off"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <Button color={"secondary"}>
          <Text style={{ fontWeight: "bold", color: "var(--base-color-text)" }}>
            Solicitar busca
          </Text>
          <SearchIcon
            style={{ color: "var(--base-color-white)" }}
            className="button-search-icon"
          />
        </Button>
      </StyledWrapper>
    </form>
  );
};

const StyledInput = styled(Input)`
  padding-left: 27px;

  @media (max-width: 600px) {
    padding-left: 0;
    font-size: 1.2rem;
  }
`;

const StyledWrapper = styled(ContainerWrapper)`
  width: auto;
  max-width: 768px;
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
