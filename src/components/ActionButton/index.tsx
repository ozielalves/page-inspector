import React, { ReactNode } from "react";
import styled, { CSSProperties } from "styled-components";

interface ButtonProps {
  children?: ReactNode;
  color?: "primary" | "secondary" | "error";
  onClick?: any;
  style?: CSSProperties;
  className?: string;
}

const ActionButton = ({ children, color, onClick, style, className }: ButtonProps) => {
  return (
    <ButtonWrapper className={className} style={style}>
      <button
        style={{
          background:
            color === "primary"
              ? "var(--base-color-deep-orange)"
              : color === "secondary"
              ? "var(--base-color-pinkish-grey)"
              : color === "error"
              ? "var(--base-color-error)"
              : "transparent",
        }}
        onClick={onClick}
      >
        {children}
      </button>
    </ButtonWrapper>
  );
};

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  > button {
    height: 56px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0px 32px;
    font-weight: bold;
    font-size: 16px;
    line-height: 20px;
    font-stretch: normal;
    font-style: normal;
    text-transform: uppercase;
    letter-spacing: 0.8px;
    text-align: center;
    color: var(--base-color-white);
    border: none;
    outline: none;
    border-radius: 50px;
    transition: all 0.3s ease 0s;
    cursor: pointer;

    &:hover {
      opacity: 0.7;
      box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
    }
  }
`;

export default ActionButton;
