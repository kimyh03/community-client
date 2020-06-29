import React from "react";
import styled from "styled-components";

const List = styled.ul``;
const Box = styled.div`
  width: 150px;
  height: 150px;
  background: ${(props) => props.theme.carrotColor};
  &:not(:last-child) {
    margin-bottom: 20px;
  }
`;

export default () => (
  <List>
    <Box></Box>
    <Box></Box>
    <Box></Box>
  </List>
);
