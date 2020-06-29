import React from "react";
import styled from "styled-components";
import { FacebookLogo, InstagramLogo } from "../Componentes/Icons";
import SearchBox from "./SearchBox";

const Header = styled.header`
  padding: 15px 0 40px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-bottom: 1px solid #d2d6dc;
`;

const Title = styled.h1`
  padding: 30px;
  font-weight: 800;
  font-size: 30px;
  color: ${(props) => props.theme.carrotColor};
`;

const List = styled.ul`
  display: flex;
`;

const MenuItem = styled.li`
  color: ${(props) => props.theme.darkGreyColor};
  font-size: 12px;
  &:not(:last-child) {
    margin-right: 16px;
  }
`;

const ListWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const Spacer = styled.div`
  margin: 0 7px;
`;

export default () => (
  <Header>
    <ListWrapper>
      <List>
        <InstagramLogo />
        <Spacer />
        <FacebookLogo />
      </List>
      <List>
        <MenuItem>소개</MenuItem>
        <MenuItem>공지사항</MenuItem>
        <MenuItem>광고문의</MenuItem>
        <MenuItem>이용약관</MenuItem>
      </List>
    </ListWrapper>
    <Title> Hobby .com </Title>
    <SearchBox />
  </Header>
);
