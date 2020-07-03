import React from "react";
import styled from "styled-components";

const Coulmn = styled.div`
  background: #fafafa;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  border-bottom: ${(props) => props.theme.boxBorder};
`;

const CoulmnItemSmall = styled.div`
  opacity: 0.7;
  text-align: center;
  width: 8%;
`;
const CoulmnItemMiddle = styled.div`
  opacity: 0.7;
  text-align: center;
  width: 17%;
`;

const CoulmnItemLarge = styled.div`
  width: 55%;
  text-align: center;
  opacity: 0.7;
`;

export default () => (
  <Coulmn>
    <CoulmnItemSmall>글번호</CoulmnItemSmall>
    <CoulmnItemLarge>제목</CoulmnItemLarge>
    <CoulmnItemMiddle>작성자</CoulmnItemMiddle>
    <CoulmnItemMiddle>작성일</CoulmnItemMiddle>
    <CoulmnItemSmall>조회수</CoulmnItemSmall>
    <CoulmnItemSmall>추천수</CoulmnItemSmall>
  </Coulmn>
);
