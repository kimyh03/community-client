import { useLazyQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import Loader from "src/Componentes/Loader";
import PostCoulmn from "src/Componentes/PostCoulmn";
import PostList from "src/Componentes/PostList";
import styled from "styled-components";

const Container = styled.div`
  background: white;
  border: ${(props) => props.theme.boxBorder};
  border-radius: 7px;
`;

const SearchTerm = styled.div`
  font-size: 30px;
  font-weight: 700;
  margin: 10px 0 20px 0;
  color: ${(props) => props.theme.carrotColor};
`;

const NoPost = styled.div``;

const PostContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const SEARCH_POST = gql`
  query searchPost($term: String!, $time: Float!) {
    searchPost(term: $term, time: $time) {
      posts {
        id
        categoryTitle
        userName
        title
        text
        viewCount
        likeCount
        commentCount
        createdAt
      }
    }
  }
`;

interface Post {
  id: string;
  categoryTitle: string;
  userName: string;
  title: string;
  text: string;
  viewCount: number;
  likeCount: number;
  commentCount: number;
  createdAt: string;
}

interface Posts {
  posts: Post[];
}

interface SearchPostResponse {
  searchPost: Posts;
}

export default withRouter(
  ({
    match: {
      params: { term }
    }
  }) => {
    const [time, setTime] = useState(1);
    const [loadMore, setLoadMore] = useState(false);
    const [stopFetch, setStopFetch] = useState(false);
    const [postList, setPostList] = useState<null | any>([]);
    const [searchPost, { loading, data }] = useLazyQuery<SearchPostResponse>(
      SEARCH_POST,
      {
        variables: { term, time },
        // tslint:disable-next-line: no-shadowed-variable
        onCompleted: (data) => {
          if (!data.searchPost.posts) {
            setStopFetch(true);
          } else {
            setStopFetch(false);
            setPostList([...postList, ...data.searchPost.posts]);
          }
        }
      }
    );

    const fetchData = async () => {
      if (stopFetch === false) {
        setTime(time + 1);
        await searchPost();
        setLoadMore(false);
      } else return;
    };

    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight
      ) {
        setLoadMore(true);
      }
    };

    const firstFetch = async () => {
      await searchPost();
    };

    useEffect(() => {
      firstFetch();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
      if (stopFetch === false) {
        window.addEventListener("scroll", handleScroll);
      }
      return () => window.removeEventListener("scroll", handleScroll);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
      if (!loadMore) return;
      fetchData();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loadMore]);

    const onClick = () => {
      console.log(postList, data?.searchPost.posts);
    };

    if (loading) return <Loader />;
    else if (!loading && postList.length > 0) {
      return (
        <>
          <button onClick={onClick}></button>
          <SearchTerm>검색어 : {term}</SearchTerm>
          <Container>
            <PostCoulmn />
            <PostContainer>
              {postList.map((item) => (
                <PostList
                  key={item.id}
                  id={item.id}
                  userName={item.userName}
                  title={item.title}
                  viewCount={item.viewCount}
                  likeCount={item.likeCount}
                  commentCount={item.commentCount}
                  createdAt={item.createdAt}
                />
              ))}
            </PostContainer>
          </Container>
        </>
      );
    } else if (!loading && postList.length === 0) {
      return (
        <>
          <button onClick={onClick}></button>
          <SearchTerm>검색어 : {term}</SearchTerm>
          <NoPost>검색 결과가 없습니다.</NoPost>
        </>
      );
    } else return <button onClick={onClick}></button>;
  }
);
