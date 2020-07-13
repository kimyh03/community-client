import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components";
import PostComment from "./PostComment";
import TogglePostBookmark from "./TogglePostBookmark";
import TogglePostLike from "./TogglePostLike";

const DELETE_POST = gql`
  mutation deletePost($id: String!) {
    deletePost(id: $id) {
      ok
    }
  }
`;

const Container = styled.div`
  width: 100%;
  background: white;
  border: ${(props) => props.theme.boxBorder};
  border-radius: 10px;
  min-height: 500px;
  padding: 30px 45px;
`;

const Title = styled.div`
  font-size: 30px;
  margin-bottom: 25px;
`;

const Username = styled.div`
  font-weight: 700;
  margin-bottom: 5px;
`;
const Text = styled.div`
  min-height: 400px;
  border-top: ${(props) => props.theme.boxBorder};
  border-bottom: ${(props) => props.theme.boxBorder};
  padding: 20px 0;
  margin: 20px 0;
`;
const ViewCount = styled.div`
  margin-left: 10px;
  opacity: 0.7;
`;
const CommentCount = styled.div`
  font-weight: 700;
`;
const LikeCount = styled.div`
  font-weight: 700;
  margin-left: 15px;
`;
const CreatedAt = styled.div`
  opacity: 0.7;
`;

const CategoryTitle = styled.div`
  font-size: 15px;
  font-weight: 700;
  color: ${(props) => props.theme.carrotColor};
  margin-bottom: 15px;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const MainCoulmn = styled.div`
  display: flex;
  flex-direction: column;
`;

const SubCoulmn = styled.div`
  display: flex;
`;

const Row = styled.div`
  display: flex;
`;

const Button = styled.button`
  width: 50px;
  height: 30px;
  margin-left: 5px;
  background: ${(props) => props.theme.carrotColor};
  color: white;
  border-radius: 7px;
  border: none;
  font-size: 15px;
  font-weight: 600;
  text-align: center;
  opacity: 1;
  transition: ease-in 0.1s;
  :hover {
    opacity: 0.8;
  }
`;

const CreatePostBtnContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  margin-bottom: 10px;
`;

const CreatePostBtn = styled.button`
  width: 70px;
  height: 30px;
  background: ${(props) => props.theme.carrotColor};
  color: white;
  border-radius: 7px;
  border: none;
  font-size: 15px;
  font-weight: 600;
  text-align: center;
  opacity: 1;
  transition: ease-in 0.1s;
  :hover {
    opacity: 0.8;
  }
`;

interface Comment {
  id: string;
  userName: string;
  text: string;
  createdAt: string;
}

interface IProps {
  categoryTitle: string;
  id: string;
  title: string;
  userName: string;
  text: string;
  viewCount: string;
  likeCount: string;
  commentCount: string;
  createdAt: string;
  reqUser: string;
  isBookmarked: boolean;
  isLiked: boolean;
  comments: [Comment];
}

const PostCard: React.FunctionComponent<IProps> = (props) => {
  const [deletePost] = useMutation(DELETE_POST, {
    variables: { id: props.id }
  });
  const onClick = async () => {
    try {
      await deletePost();
      window.location.href = `http://localhost:3000/category/${props.categoryTitle}/1`;
      toast.warning("글이 삭제되었습니다.");
    } catch (error) {
      toast.error("잘못된 접근 입니다.");
    }
  };
  const isSelf = props.userName === props.reqUser;
  return (
    <>
      <CreatePostBtnContainer>
        <Link to={`/${props.categoryTitle}/create`}>
          <CreatePostBtn>글쓰기</CreatePostBtn>
        </Link>
      </CreatePostBtnContainer>
      <Container>
        {isSelf ? (
          <Wrapper>
            <Link to={`/category/${props.categoryTitle}/1`}>
              <CategoryTitle>{props.categoryTitle}</CategoryTitle>
            </Link>
            <SubCoulmn>
              <Link to={`/${props.categoryTitle}/${props.id}/edit`}>
                <Button>수정</Button>
              </Link>
              <Button onClick={onClick}>삭제</Button>
            </SubCoulmn>
          </Wrapper>
        ) : (
          <Wrapper>
            <Link to={`/category/${props.categoryTitle}/1`}>
              <CategoryTitle>{props.categoryTitle}</CategoryTitle>
            </Link>
            <SubCoulmn>
              <TogglePostBookmark
                postId={props.id}
                isBookmarked={props.isBookmarked}
              />
              <TogglePostLike postId={props.id} isLiked={props.isLiked} />
            </SubCoulmn>
          </Wrapper>
        )}
        <Title>{props.title}</Title>
        <Wrapper>
          <MainCoulmn>
            <Row>
              <Link to={`/user/${props.userName}`}>
                <Username>{props.userName}</Username>
              </Link>
            </Row>
            <Row>
              <CreatedAt>{props.createdAt.substring(0, 10)}</CreatedAt>
              <ViewCount>{`조회 ${props.viewCount}`}</ViewCount>
            </Row>
          </MainCoulmn>
          <SubCoulmn>
            <CommentCount>{`댓글 ${props.commentCount}`}</CommentCount>
            <LikeCount>{`추천 ${props.likeCount}`}</LikeCount>
          </SubCoulmn>
        </Wrapper>
        <Text>{props.text}</Text>
        <PostComment
          key={props.id}
          postId={props.id}
          comments={props.comments}
          commentCount={props.commentCount}
          reqUser={props.reqUser}
        />
      </Container>
    </>
  );
};

export default PostCard;
