import React from "react";
import styled from "styled-components";

const Footer = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-transform: uppercase;
  font-weight: 600;
  font-size: 12px;
  padding: 50px;
  width: 100%;
  max-width: 1200px;
  margin: 0;
  margin: auto;
`;

const Wrapper = styled.div`
  border-top: 1px solid #d2d6dc;
  width: 100%;
`;

const List = styled.ul`
  display: flex;
`;

const ListItem = styled.li`
  &:not(:last-child) {
    margin-right: 16px;
  }
`;

const Link = styled.a`
  color: ${(props) => props.theme.darkGreyColor};
`;

const Copyright = styled.span`
  color: ${(props) => props.theme.darkGreyColor};
`;

export default () => (
  <Wrapper>
    <Footer>
      <List>
        <ListItem>
          <Link href="#">Hoony@hobby.com</Link>
        </ListItem>
      </List>
      <Copyright>Hobbydotcom {new Date().getFullYear()} &copy;</Copyright>
    </Footer>
  </Wrapper>
);
