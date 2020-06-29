import React from "react";
import styled, { ThemeProvider } from "styled-components";
import GlobalStyles from "../Styles/GlobalStyles";
import Theme from "../Styles/Theme";
import CharityBox from "./CharityBox";
import Footer from "./Footer";
import Header from "./Header";
import Router from "./Router";
import UserBox from "./UserBox";

const Main = styled.div`
  margin: 0 auto;
  width: 100%;
  max-width: 1200px;
  height: 1000px;
`;

const RowWrapper = styled.div`
  display: flex;
`;

const ColumnWrapper = styled.div`
  margin: 0 auto;
  width: 100%;
  max-width: 1200px;
  height: 1000px;
  justify-content: flex-end;
`;

export default () => (
  <ThemeProvider theme={Theme}>
    <>
      <GlobalStyles />
      <Header />
      <Main>
        <RowWrapper>
          <Router />
          <ColumnWrapper>
            <UserBox />
            <CharityBox />
          </ColumnWrapper>
        </RowWrapper>
      </Main>
      <Footer />
    </>
  </ThemeProvider>
);
