import React from "react";
import styled from "styled-components";
import { ReactComponent as OzielLogo } from "../../assets/logo-navbar-oziel.svg";
import { ReactComponent as LinkedinLogo } from "../../assets/linkedin-brand.svg";
import { ReactComponent as GithubLogo } from "../../assets/github-brand.svg";
import { Text, ContainerWrapper } from "../../styles";

const Navbar = () => {
  return (
    <StyledWrapper>
      <Wrapper>
        <OzielLogo />
        <LogoText style={{ marginLeft: 24 }}>pageinspector</LogoText>
      </Wrapper>
      <Wrapper /* style={{marginTop: 5}} */>
        <a
          style={{ textDecoration: "none" }}
          href="https://www.linkedin.com/in/ozielalves/"
          title="Linkedin - Oziel Alves"
        >
          <LinkedinIcon />
        </a>
        <a
          style={{ textDecoration: "none", marginLeft: 24 }}
          href="https://github.com/ozielalves"
          title="GitHub - Oziel Alves"
        >
          <GithubIcon style={{ marginLeft: 24 }} />
        </a>
      </Wrapper>
    </StyledWrapper>
  );
};

const StyledWrapper = styled(ContainerWrapper)`
  height: 73px;
  justify-content: space-between;
  padding: 0 48px;
  border: 1px solid var(--base-color-border);
  border-left: none;
  border-right: none;
  border-top: none;
`;

const Wrapper = styled(ContainerWrapper)`
  width: auto;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LogoText = styled(Text)`
  font-weight: bold;
  font-size: 26.6967px;
  line-height: 33px;

  @media (max-width: 600px) {
    font-size: 1.2rem;
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
