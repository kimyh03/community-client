import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import SearchBox from "./SearchBox";

const Container = styled.div`
  border-bottom: 1px solid #d2d6dc;
  background: white;
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 15px;
`;

const Header = styled.header`
  padding: 20px 0;
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  min-width: 900px;
  justify-content: space-between;
`;

const Title = styled.h1`
  font-weight: 800;
  font-size: 30px;
  color: ${(props) => props.theme.carrotColor};
`;

const MenuItem = styled.div`
  color: ${(props) => props.theme.darkGreyColor};
  font-size: 12px;
  &:not(:last-child) {
    margin-right: 16px;
  }
`;

const ListWrapper = styled.div`
  display: flex;
`;

export default () => (
  <Container>
    <Header>
      <Link to={`/`}>
        <Title> Hobby .com </Title>
      </Link>
      <SearchBox />
      <ListWrapper>
        <MenuItem>소개</MenuItem>
        <MenuItem>공지사항</MenuItem>
        <MenuItem>광고문의</MenuItem>
        <MenuItem>이용약관</MenuItem>
      </ListWrapper>
    </Header>
  </Container>
);
