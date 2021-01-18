import React from "react";
import { Request } from "../../db/repositories/requests";
import styled from "styled-components";
import TableItem from "./TableItem";
import { TableItemContent, Text, Wrapper, TableCell } from "../../styles";
import CircularProgress from "../CircularProgress";

interface TableProps {
  data?: Request[];
  setFilter: React.Dispatch<React.SetStateAction<string>>;
}

const Table = ({ data, setFilter }: TableProps) => {
  return (
    <StyledWrapper>
      <TableItemContent style={{ margin: "10px 0 17px 0" }}>
        <TableCell>
          <StyledText>Palavra Chave</StyledText>
        </TableCell>
        <TableCell style={{width: 70, justifyContent: "center"}}>
          <StyledText>Status</StyledText>
        </TableCell>
      </TableItemContent>
      {data ? (
        data.map(({ id, keyword, status }: Request) => (
          <TableItem
            key={id}
            id={id!}
            keyword={keyword}
            status={status}
            setFiler={setFilter}
          />
        ))
      ) : (
        <CircularProgress size={300} />
      )}
    </StyledWrapper>
  );
};

const StyledText = styled(Text)`
  font-weight: bold;
  font-size: 18px;
  color: var(--base-color-grey);
`;

const StyledWrapper = styled(Wrapper)`
  flex-direction: column;
  justify-content: flex-start;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  position: relative;
  padding: 0 10px;

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
    padding: 0;
  }

  @media (max-width: 600px) {
    height: 220px;
  }
`;

export default Table;