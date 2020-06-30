import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import React from "react";
import styled, { ThemeProvider } from "styled-components";
import GlobalStyles from "../Styles/GlobalStyles";
import Theme from "../Styles/Theme";
import CharityBox from "./CharityBox";
import Footer from "./Footer";
import Header from "./Header";
import Router from "./Router";
import UserBox from "./UserBox";

const Grid = styled.div`
  margin: 0 auto;
  width: 100%;
  max-width: 1200px;
  height: 1000px;
  display: grid;
  grid-template-columns: 950px 240px;
  column-gap: 10px;
`;

const ColumnWrapper = styled.div`
  margin: 0 auto;
  width: 100%;
  max-width: 1200px;
  height: 1000px;
  justify-content: flex-end;
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
        <Header />
        <Grid>
          <Router isLoggedIn={data?.isLoggedIn} />
          <ColumnWrapper>
            <UserBox isLoggedIn={data?.isLoggedIn} />
            <CharityBox />
          </ColumnWrapper>
        </Grid>
        <Footer />
      </>
    </ThemeProvider>
  );
};
