import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 20px 0;
  border-bottom: ${(props) => props.theme.boxBorder};
  :hover {
    background: #fafafa;
    color: ${(props) => props.theme.carrotColor};
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
      <Link to={`/post/${props.id}`}>{props.title}</Link>
      <Item>{`(${props.commentCount})`}</Item>
    </CoulmnItemLarge>
    <CoulmnItemMiddle>
      <a href={`/user/${props.userName}`}>{props.userName}</a>
    </CoulmnItemMiddle>
    <CoulmnItemMiddle>{props.createdAt.substring(0, 10)}</CoulmnItemMiddle>
    <CoulmnItemSmall>{props.viewCount}</CoulmnItemSmall>
    <CoulmnItemSmall>{props.likeCount}</CoulmnItemSmall>
  </Container>
);

export default PostList;
