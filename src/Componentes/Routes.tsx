import React from "react";
import { Route, Switch } from "react-router-dom";
import Category from "src/Routes/Category";
import CreatePost from "src/Routes/CreatePost";
import EditPost from "src/Routes/EditPost";
import Home from "src/Routes/Home";
import Post from "src/Routes/Post";
import Profile from "src/Routes/Profile";
import Search from "src/Routes/Search";
import SignUp from "src/Routes/SignUp";

interface IProps {
  isLoggedIn: boolean;
}

const AppRouter: React.SFC<IProps> = (props) => (
  <Switch>
    <Route path={"/"} exact={true} component={Home} />
    <Route path={"/signUp"} exact={true} component={SignUp} />
    <Route path="/search" component={Search} />
    <Route
      path={"/category/:category/:page"}
      exact={true}
      component={Category}
    />
    <Route path={"/:category/create"} exact={true} component={CreatePost} />
    <Route path={"/post/:post"} exact={true} component={Post} />
    <Route path={"/user/:nickname"} exact={true} component={Profile} />
    <Route path={"/:category/:post/edit"} exact={true} component={EditPost} />
  </Switch>
);

export default AppRouter;
