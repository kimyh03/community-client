import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import React from "react";
import { withRouter } from "react-router-dom";
import Loader from "src/Componentes/Loader";
import PostList from "src/Componentes/PostList";
import styled from "styled-components";

interface Post {
  id: string;
  userName: string;
  title: string;
  viewCount: string;
  likeCount: string;
  commentCount: string;
  createdAt: string;
}

interface Response {
  ok: boolean;
  error: string | null;
  posts: Post[];
}

interface PostListData {
  seePostList: Response;
}

interface SeePostListInput {
  categoryTitle: string;
  page: number;
}

const GET_POSTLIST = gql`
  query seePostList($categoryTitle: String!, $page: Float!) {
    seePostList(categoryTitle: $categoryTitle, page: $page) {
      posts {
        id
        userName
        title
        viewCount
        likeCount
        commentCount
        createdAt
      }
      ok
      error
    }
  }
`;

const Container = styled.div`
  background: white;
  border: ${(props) => props.theme.boxBorder};
  border-radius: 7px;
  height: 100%;
  max-height: 650px;
`;

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

const Title = styled.div`
  font-size: 30px;
  font-weight: 700;
  margin: 10px 0;
  color: ${(props) => props.theme.carrotColor};
`;

const PostContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export default withRouter(
  ({
    match: {
      params: { category, page }
    }
  }) => {
    const PAGE = Number(page);
    const { loading, data } = useQuery<PostListData, SeePostListInput>(
      GET_POSTLIST,
      {
        variables: { categoryTitle: category, page: PAGE }
      }
    );
    console.log(data);
    return (
      <>
        <Title>{category}</Title>
        <Container>
          <Coulmn>
            <CoulmnItemSmall>글번호</CoulmnItemSmall>
            <CoulmnItemLarge>제목</CoulmnItemLarge>
            <CoulmnItemMiddle>작성자</CoulmnItemMiddle>
            <CoulmnItemMiddle>작성일</CoulmnItemMiddle>
            <CoulmnItemSmall>조회수</CoulmnItemSmall>
            <CoulmnItemSmall>추천수</CoulmnItemSmall>
          </Coulmn>
          <PostContainer>
            {loading ? (
              <Loader />
            ) : (
              data?.seePostList.posts.map((post) => (
                <PostList
                  key={post.id}
                  id={post.id}
                  userName={post.userName}
                  title={post.title}
                  viewCount={post.viewCount}
                  likeCount={post.likeCount}
                  commentCount={post.commentCount}
                  createdAt={post.createdAt}
                />
              ))
            )}
          </PostContainer>
        </Container>
      </>
    );
  }
);
