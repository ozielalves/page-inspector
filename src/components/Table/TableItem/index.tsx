import React from "react";
import styled from "styled-components";
import { TableItemContent, Text, TableCell } from "../../../styles";
import ActionButton from "../../ActionButton";
import CircularProgress from "../../CircularProgress";
import { ReactComponent as TrashIcon } from "../../../assets/trash-icon.svg";

interface TableItemProps {
  id: string;
  keyword: string;
  status: string;
  setFilter: React.Dispatch<React.SetStateAction<string>>;
  handleDelete: (id: string) => void;
}

const Table = ({ keyword, status, setFilter, id, handleDelete }: TableItemProps) => {
  return (
    <ClickableTableItem
      style={{
        backgroundColor:
          status === "done"
            ? "var(--base-color-green)"
            : "var(--base-color-deep-orange)",
      }}
      onClick={() => setFilter(id)}
    >
      <div></div>
      <TableCell>
        <StyledText>{keyword}</StyledText>
      </TableCell>
      <TableCell style={{ justifyContent: "flex-end" }}>
        {status === "done" ? (
          <>
            <StyledText>{status}</StyledText>
            <ActionButton
              color="error"
              onClick={(e:any) => {
                e.stopPropagation();
                handleDelete(id);
              }}
              style={{ width: "30%" }}
            >
              <TrashIcon />
            </ActionButton>
          </>
        ) : (
          <>
          <CircularProgress size={30} color={"white"} />
          </>
        )}
      </TableCell>
    </ClickableTableItem>
  );
};

const ClickableTableItem = styled(TableItemContent)`
  cursor: pointer;
  transition: opacity 0.5s ease;
  margin: 5px;
  padding: 9px 0 9px 72px;

  button {
    padding: 0;
    height: 40px;
    width: 40px;
  }

  &:hover {
    opacity: 0.7;
  }

  @media (max-width: 600px) {
    padding: 9px 4px 9px 36px;
  }
`;

const StyledText = styled(Text)`
  font-weight: normal;
  font-size: 18px;
  color: var(--base-color-white);
`;

export default Table;
