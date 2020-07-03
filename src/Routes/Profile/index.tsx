import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import React from "react";
import { withRouter } from "react-router-dom";
import Loader from "src/Componentes/Loader";
import PostCoulmn from "src/Componentes/PostCoulmn";
import PostList from "src/Componentes/PostList";
import ProfileCard from "src/Componentes/ProfileCard";
// import useButton from "src/Hooks/UseButton";
import styled from "styled-components";

const Container = styled.div`
  background: white;
  border: ${(props) => props.theme.boxBorder};
  border-radius: 7px;
  height: 100%;
  max-height: 650px;
  margin-top: 100px;
`;

const PostContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

interface BookmarkedPosts {
  id: string;
  userName: string;
  title: string;
  viewCount: number;
  likeCount: number;
  commentCount: number;
  createdAt: string;
}

interface Posts {
  id: string;
  userName: string;
  title: string;
  viewCount: number;
  likeCount: number;
  commentCount: number;
  createdAt: string;
}

interface FavCategories {
  title: string;
  id: string;
}

interface User {
  id: string;
  nickname: string;
  email: string;
  bio: string;
  favCategories: FavCategories[];
  posts: Posts[];
  bookmarkedPosts: BookmarkedPosts[];
  postCount: number;
  likesReceivedCount: number;
}

interface Response {
  ok: boolean;
  error: string | null;
  user: User;
}

interface GetUserProfile {
  getUserProfile: Response;
}

const GET_USER_PROFILE = gql`
  query getUserProfile($nickname: String!) {
    getUserProfile(nickname: $nickname) {
      user {
        id
        nickname
        email
        bio
        favCategories {
          title
          id
        }
        posts {
          id
          userName
          title
          viewCount
          likeCount
          commentCount
          createdAt
        }
        bookmarkedPosts {
          id
          userName
          title
          viewCount
          likeCount
          commentCount
          createdAt
        }
        postCount
        likesReceivedCount
      }
      ok
      error
    }
  }
`;

export default withRouter(
  ({
    match: {
      params: { nickname }
    }
  }) => {
    const { loading, data } = useQuery<GetUserProfile>(GET_USER_PROFILE, {
      variables: { nickname }
    });
    return (
      <>
        {loading ? (
          <Loader />
        ) : (
          <>
            {data?.getUserProfile && data.getUserProfile.user && (
              <ProfileCard
                key={data.getUserProfile.user.id}
                id={data.getUserProfile.user.id}
                nickname={data.getUserProfile.user.nickname}
                bio={data.getUserProfile.user.bio}
                email={data.getUserProfile.user.email}
                likeCount={data.getUserProfile.user.likesReceivedCount}
                favCategories={data.getUserProfile.user.favCategories}
              />
            )}
            <Container>
              <PostCoulmn />
              <PostContainer>
                {data?.getUserProfile.user.posts.map((post) => (
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
              </PostContainer>
            </Container>
          </>
        )}
      </>
    );
  }
);
