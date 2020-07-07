import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import GlobalStyles from "../Styles/GlobalStyles";
import Theme from "../Styles/Theme";
import CharityBox from "./CharityBox";
import Footer from "./Footer";
import Header from "./Header";
import LoggedInUserBox from "./LoggedInUserBox";
import LoggedOutUserBox from "./LoggedOutUserBox";
import Routes from "./Routes";

const Grid = styled.div`
  margin: 0;
  margin: auto;
  width: 100%;
  max-width: 1200px;
  min-height: 1100px;
  display: grid;
  grid-template-columns: 950px 230px;
  column-gap: 20px;
`;

const ColumnWrapper = styled.div`
  margin: 10px 0;
  width: 100%;
  height: 100%;
`;

const GET_ISLOGGEDIN = gql`
  {
    isLoggedIn @client
  }
`;

export default () => {
  const { data } = useQuery(GET_ISLOGGEDIN);
  return (
    <ThemeProvider theme={Theme}>
      <>
        <GlobalStyles />
        <Router>
          <Header />
          <Grid>
            <ColumnWrapper>
              <Routes isLoggedIn={data?.isLoggedIn} />
            </ColumnWrapper>
            <ColumnWrapper>
              {data?.isLoggedIn ? <LoggedInUserBox /> : <LoggedOutUserBox />}
              <CharityBox />
            </ColumnWrapper>
          </Grid>
          <Footer />
        </Router>
      </>
    </ThemeProvider>
  );
};
