import React from "react";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Routes from "./routes";
import { PageWrapper } from "./styles";
import { observer } from "mobx-react";

const App = observer(() => {
  return (
    <PageWrapper>
      <Navbar />
      <Routes />
      <Footer />
    </PageWrapper>
  );
});

export default App;
