import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 10px 0;
  border-bottom: ${(props) => props.theme.boxBorder};
  :hover {
    background: #fafafa;
  }
`;

const Item = styled.div`
  font-weight: 800;
  font-size: 15px;
  color: ${(props) => props.theme.carrotColor};
  align-self: flex-start;
  margin-left: 5px;
`;

const CoulmnItemSmall = styled.div`
  opacity: 0.7;
  text-align: center;
  width: 67px;
`;

const CoulmnItemMiddle = styled.span`
  opacity: 0.7;
  text-align: center;
  width: 143px;
`;

const CoulmnItemLarge = styled.div`
  padding: 0 10px;
  width: 461px;
  opacity: 0.7;
  display: flex;
  align-items: center;
`;

interface IProps {
  id: string;
  userName: string;
  title: string;
  viewCount: any;
  likeCount: any;
  commentCount: any;
  createdAt: string;
}

const PostList: React.FunctionComponent<IProps> = (props) => (
  <Container>
    <CoulmnItemSmall>{props.id}</CoulmnItemSmall>
    <CoulmnItemLarge>
      {props.title}
      <Item>{`(${props.commentCount})`}</Item>
    </CoulmnItemLarge>
    {props.userName === "Hoony" ? (
      <CoulmnItemMiddle>{props.userName}</CoulmnItemMiddle>
    ) : (
      <CoulmnItemMiddle>{props.userName}</CoulmnItemMiddle>
    )}
    <CoulmnItemMiddle>{props.createdAt.substring(0, 10)}</CoulmnItemMiddle>
    <CoulmnItemSmall>{props.viewCount}</CoulmnItemSmall>
    <CoulmnItemSmall>{props.likeCount}</CoulmnItemSmall>
  </Container>
);

export default PostList;
