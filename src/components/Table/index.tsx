import React from "react";
import { Request } from "../../db/repositories/requests";
import styled from "styled-components";
import TableItem from "./TableItem";
import { TableItemContent, Text, Wrapper, TableCell } from "../../styles";
import CircularProgress from "../CircularProgress";

interface TableProps {
  data?: Request[];
  setFilter: React.Dispatch<React.SetStateAction<string>>;
  handleDelete: (id: string) => void;
}

const Table = ({ data, setFilter, handleDelete }: TableProps) => {
  return (
    <StyledWrapper>
      <StyledTableItem>
        <TableCell>
          <StyledText style={{ whiteSpace: "normal" }}>
            Palavra Chave
          </StyledText>
        </TableCell>
        {/* <div> */}
        <TableCell style={{ justifyContent: "flex-end" }}>
          <StyledText>Status</StyledText>
        </TableCell>
        <FakeCell />
        {/* </div> */}
      </StyledTableItem>
      <RowWrapper>
        {data ? (
          data.map(({ id, keyword, status }: Request) => (
            <TableItem
              key={id}
              id={id!}
              keyword={keyword!}
              status={status}
              setFilter={setFilter}
              handleDelete={handleDelete}
            />
          ))
        ) : (
          <CircularProgress size={100} color="grey" />
        )}
      </RowWrapper>
    </StyledWrapper>
  );
};

const FakeCell = styled.div`
  width: 1px;
  margin: 20px;

  @media (max-width: 600px) {
    margin: 10px;
  }
`;

const StyledTableItem = styled(TableItemContent)`
  margin: 10px 40px 17px 40px;

  @media (max-width: 600px) {
    margin: 10px 36px;
  }
`;

const StyledText = styled(Text)`
  font-weight: bold;
  font-size: 18px;
  color: var(--base-color-grey);
`;

const StyledWrapper = styled(Wrapper)`
  flex-direction: column;
  justify-content: flex-start;
  height: 90%;
  width: 75%;
  padding: 0 10px;

  @media (max-width: 1024px) {
    width: 100%;
    padding: 0;
  }
`;

const RowWrapper = styled(StyledWrapper)`
  width: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 0;
  height: 100%;
  border-radius: 25px;
  padding-right: 20px;

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

  @media (max-width: 1024px) {
    padding: 0;
    padding-right: 10px;
  }
`;

export default Table;
