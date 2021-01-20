import React from "react";
import styled from "styled-components";
import { ReactComponent as OzielLogo } from "../../assets/logo-navbar-oziel.svg";
import { ReactComponent as LinkedinLogo } from "../../assets/linkedin-brand.svg";
import { ReactComponent as GithubLogo } from "../../assets/github-brand.svg";
import { SubTitle as LogoText, ContainerWrapper, Wrapper } from "../../styles";

const Navbar = () => {
  return (
    <StyledWrapper>
      <Wrapper>
        <OzielLogo />
        <LogoText style={{ marginLeft: 24 }}>pageinspector</LogoText>
      </Wrapper>
      <IconsWrapper>
        <a
          style={{ textDecoration: "none", margin: "5px 0 0 24px" }}
          href="https://www.linkedin.com/in/ozielalves/"
          title="Linkedin - Oziel Alves"
        >
          <LinkedinIcon />
        </a>
        <a
          style={{ textDecoration: "none", margin: "5px 0 0 24px" }}
          href="https://github.com/ozielalves"
          title="GitHub - Oziel Alves"
        >
          <GithubIcon />
        </a>
      </IconsWrapper>
    </StyledWrapper>
  );
};

const IconsWrapper = styled(Wrapper)`
  @media (max-width: 320px) {
    display: none;
  }
`;

const StyledWrapper = styled(ContainerWrapper)`
  height: 73px;
  justify-content: space-between;
  padding: 0 117px;
  border: 1px solid var(--base-color-border);
  border-left: none;
  border-right: none;
  border-top: none;

  @media (max-width: 600px) {
    padding: 0 48px;
  }
`;

const LinkedinIcon = styled(LinkedinLogo)`
  transition: opacity 0.3s ease 0s;
  &:hover {
    opacity: 0.7;
  }
`;

const GithubIcon = styled(GithubLogo)`
  transition: opacity 0.3s ease 0s;
  &:hover {
    opacity: 0.7;
  }
`;

export default Navbar;
