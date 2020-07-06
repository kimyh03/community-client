import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  background: white;
  border: ${(props) => props.theme.boxBorder};
  border-radius: 10px;
  min-height: 1000px;
`;

const Title = styled.div`
  color: ${(props) => props.theme.carrotColor};
  font-size: 20px;
`;

const Text = styled.div``;
const Username = styled.div``;
const ViewCount = styled.div``;
const CommentCount = styled.div``;
const CreatedAt = styled.div``;

interface IProps {
  id: string;
  title: string;
  username: string;
  text: string;
  viewcount: string;
  commentCount: string;
  createdAt: string;
}

const PostCard: React.FunctionComponent<IProps> = (props) => (
  <>
    <Container>
      <Title>{props.title}</Title>
      <Username>{props.username}</Username>
      <Text>{props.text}</Text>
      <ViewCount>{props.viewcount}</ViewCount>
      <CommentCount>{props.commentCount}</CommentCount>
      <CreatedAt>{props.createdAt}</CreatedAt>
    </Container>
  </>
);

export default PostCard;
