import React, { ReactNode } from "react";
import styled from "styled-components";
import { SubTitle, Text, Wrapper } from "../../styles";
import CircularProgress from "../CircularProgress";
import { ReactComponent as CloseIcon } from "../../assets/close-icon.svg";
import ActionButton from "../ActionButton";

interface RequestDetailsProps {
  open: boolean;
  onClose: () => void;
  children?: ReactNode;
  title?: string;
}

const RequestDetails = ({
  open,
  onClose,
  children,
  title,
}: RequestDetailsProps) => {
  return open ? (
    <ModalBackdrop
      onClick={() => {
        onClose();
      }}
    >
      <ModalWrapper
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <ModalHeader>
          <SubTitle>{title}</SubTitle>
          <ActionButton
            onClick={() => {
              onClose();
            }}
          >
            <CloseIcon />
          </ActionButton>
        </ModalHeader>
        <ModalContent>{children}</ModalContent>
      </ModalWrapper>
    </ModalBackdrop>
  ) : null;
};

const ModalHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  padding-bottom: 10px;
  border: 1px solid var(--base-color-border);
  border-left: none;
  border-right: none;
  border-top: none;
`;

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
`;

const ModalContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 70%;
  min-height: 200px;
  width: 60%;
  background-color: var(--base-color-white);
  box-shadow: var(--base-color-shadow) 0px 4px 10px 0px;
  border-radius: 50px;
  padding: 37px 65px;

  ._button {
    position: absolute;
    right: 0;
  }

  button {
    padding: 0;
    height: 40px;
    width: 40px;
  }

  @media (max-width: 600px) {
    width: 80%;
    padding: 30px;
    max-height: 60%;
  }

  @media (max-width: 380px) {
    width: 90%;
    padding: 30px;
    max-height: 70%;
  }
`;

export default RequestDetails;
