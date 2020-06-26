import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "src/Routes/Home";

const AppRouter: React.SFC = () => (
  <BrowserRouter>
    <Switch>
      <Route path={"/"} exact={true} component={Home} />
    </Switch>
  </BrowserRouter>
);

export default AppRouter;
