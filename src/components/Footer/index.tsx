import React from "react";
import { ReactComponent as OzielLogo } from "../../assets/logo-footer-oziel.svg";
import { Text, ContainerWrapper } from "../../styles";

const Footer = () => {
  return (
    <ContainerWrapper style={{ padding: "0 30px 0 10px" }}>
      <OzielLogo />
      <Text style={{ marginLeft: 25, textAlign: "center" }}>
        Desenvolvido por Oziel Alves
      </Text>
    </ContainerWrapper>
  );
};

export default Footer;
