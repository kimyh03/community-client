import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import React from "react";
import { Link, withRouter } from "react-router-dom";
import Loader from "src/Componentes/Loader";
import Pages from "src/Componentes/Pages";
import PostCoulmn from "src/Componentes/PostCoulmn";
import PostList from "src/Componentes/PostList";
import ToggleFavCategory from "src/Componentes/ToggleFavCategory";
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
  isFav: boolean;
  postCount: number;
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
      isFav
      ok
      error
      postCount
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
  height: 93%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const PostListWrapper = styled.div``;

const NoPost = styled.div`
  margin: 0;
  margin: auto;
  padding-top: 100px;
`;

const Button = styled.button`
  width: 70px;
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

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
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
          <Wrapper>
            <TitleWrapper>
              <Title>{category}</Title>
              <ToggleFavCategory
                isFav={data?.seePostList.isFav}
                category={category}
              />
            </TitleWrapper>
            <Link to={`/${category}/create`}>
              <Button>글쓰기</Button>
            </Link>
          </Wrapper>
          <Container>
            <PostCoulmn />
            <PostContainer>
              {loading ? (
                <Loader />
              ) : (
                <PostListWrapper>
                  {data?.seePostList.posts.map((post) => (
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
                  ))}
                </PostListWrapper>
              )}
              <Pages
                category={category}
                postCount={data?.seePostList.postCount}
              />
            </PostContainer>
          </Container>
        </>
      );
    } else {
      return (
        <>
          <Wrapper>
            <TitleWrapper>
              <Title>{category}</Title>
            </TitleWrapper>
            <Link to={`/${category}/create`}>
              <Button>글쓰기</Button>
            </Link>
          </Wrapper>
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
