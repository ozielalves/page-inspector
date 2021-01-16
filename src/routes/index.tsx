import React from "react";
import { Route, BrowserRouter } from "react-router-dom";

import Home from "../pages/Home";
/* import Requests from "../pages/Requests"; */

const Routes = () => {
  return (
    <BrowserRouter>
      <Route component={Home} path="/" exact />
      {/* <Route component={Requests} path="/requests" /> */}
    </BrowserRouter>
  );
};

export default Routes;