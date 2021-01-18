import React from "react";
import styled from "styled-components";
import { TableItemContent, Text, Wrapper, TableCell } from "../../../styles";

interface TableItemProps {
  id: string;
  keyword: string;
  status: string;
  setFiler: React.Dispatch<React.SetStateAction<string>>;
}

const Table = ({ keyword, status, setFiler, id }: TableItemProps) => {
  return (
    <StyledWrapper onClick={() => setFiler(id)}>
      <ClickableTableItem
        style={{
          backgroundColor:
            status === "done"
              ? "var(--base-color-green)"
              : "var(--base-color-deep-orange)",
        }}
      >
        <TableCell>
          <StyledText>{keyword}</StyledText>
        </TableCell>
        <TableCell style={{ width: 70, justifyContent: "center" }}>
          <StyledText>{status}</StyledText>
        </TableCell>
      </ClickableTableItem>
    </StyledWrapper>
  );
};

const ClickableTableItem = styled(TableItemContent)`
  cursor: pointer;
  transition: opacity 0.5s ease;

  &:hover {
    opacity: 0.7;
  }
`;

const StyledText = styled(Text)`
  font-weight: bold;
  font-size: 18px;
  color: var(--base-color-white);
`;

const StyledWrapper = styled(Wrapper)`
  flex-direction: column;
  align-items: flex-start;
  overflow-y: auto;
  position: relative;
  padding: 0 10px 17px 10px;

  @media (max-width: 600px) {
    padding: 0 0 17px 0;
  }
`;

export default Table;
