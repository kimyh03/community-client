import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "src/Routes/Home";

interface IProps {
  isLoggedIn: boolean;
}

const AppRouter: React.SFC<IProps> = (props) => (
  <BrowserRouter>
    <Switch>
      <Route path={"/"} exact={true} component={Home} />
    </Switch>
  </BrowserRouter>
);

export default AppRouter;
