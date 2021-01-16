import React from "react";
import { ReactComponent as OzielLogo } from "../../assets/logo-footer-oziel.svg";
import { Text, ContainerWrapper } from "../../styles";

const Footer = () => {
  return (
    <ContainerWrapper>
      <OzielLogo />
      <Text style={{ marginLeft: 25 }}>Desenvolvido por Oziel Alves</Text>
    </ContainerWrapper>
  );
};

export default Footer;
