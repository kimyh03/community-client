import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import React from "react";
import { withRouter } from "react-router-dom";
import Loader from "src/Componentes/Loader";
import PostCoulmn from "src/Componentes/PostCoulmn";
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

const Title = styled.div`
  font-size: 30px;
  font-weight: 700;
  margin: 10px 0 20px 0;
  color: ${(props) => props.theme.carrotColor};
`;

const PostContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const NoPost = styled.div`
  margin: 0;
  margin: auto;
  padding-top: 100px;
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
    if (loading) {
      return <Loader />;
    } else if (
      data?.seePostList &&
      data?.seePostList.posts &&
      data?.seePostList.posts.length > 0
    ) {
      return (
        <>
          <Title>{category}</Title>
          <Container>
            <PostCoulmn />
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
    } else {
      return (
        <>
          <Title>{category}</Title>
          <Container>
            <PostCoulmn />
            <PostContainer>
              <NoPost>아직 게시물이 없습니다.</NoPost>
            </PostContainer>
          </Container>
        </>
      );
    }
  }
);
