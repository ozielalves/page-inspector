import React from "react";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Routes from "./routes";
import { PageWrapper } from "./styles";

function App() {
  return (
    <PageWrapper>
      <Navbar />
      <Routes />
      <Footer />
    </PageWrapper>
  );
}

export default App;
