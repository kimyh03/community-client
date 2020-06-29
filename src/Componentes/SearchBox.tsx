import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 370px;
  height: 50px;
  border: solid 3px #ec6a36;
`;
const SearchInput = styled.input`
  border: none;
  height: 100%;
  width: 100%;
`;
const SearchButtonContainer = styled.div`
  width: 50px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const SearchButton = styled.button`
  color: white;
  height: 100%;
  width: 100%;
  background: ${(props) => props.theme.carrotColor};
  border: none;
`;

export default () => (
  <Container>
    <SearchInput placeholder="검색어를 입력하세요" />
    <SearchButtonContainer>
      <SearchButton>검색</SearchButton>
    </SearchButtonContainer>
  </Container>
);
