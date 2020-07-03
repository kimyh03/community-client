import React from "react";
import { Route, Switch } from "react-router-dom";
import Category from "src/Routes/Category";
import Home from "src/Routes/Home";
import Post from "src/Routes/Post";
import Profile from "src/Routes/Profile";
import Search from "src/Routes/Search";

interface IProps {
  isLoggedIn: boolean;
}

const AppRouter: React.SFC<IProps> = (props) => (
  <Switch>
    <Route path={"/"} exact={true} component={Home} />
    <Route path="/search" component={Search} />
    <Route
      path={"/category/:category/:page"}
      exact={true}
      component={Category}
    />
    <Route path={"/post/:post"} exact={true} component={Post} />
    <Route path={"/user/:nickname"} exact={true} component={Profile} />
  </Switch>
);

export default AppRouter;
