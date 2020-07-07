import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import React from "react";
import { withRouter } from "react-router-dom";
import Loader from "src/Componentes/Loader";
import PostCoulmn from "src/Componentes/PostCoulmn";
import PostList from "src/Componentes/PostList";
import ProfileCard from "src/Componentes/ProfileCard";
import useButton from "src/Hooks/UseButton";
import styled from "styled-components";

const PostContainer = styled.div`
  background: white;
  border: ${(props) => props.theme.boxBorder};
  border-radius: 7px;
  height: 100%;
  max-height: 650px;
  margin-top: 100px;
  display: flex;
  flex-direction: column;
`;

const ButtonContainer = styled.div`
  display: flex;
`;
const Button = styled.button<{ isClicked: boolean }>`
  width: 100%;
  height: 40px;
  border: ${(props) => props.theme.boxBorder};
  opacity: ${(props) => (props.isClicked ? 0.6 : 0.9)};
  font-weight: ${(props) => (props.isClicked ? 800 : 500)};
  color: ${(props) => (props.isClicked ? props.theme.carrotColor : "black")};
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
  reqUser: string;
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
      reqUser
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
    const { value, onClick } = useButton("myPosts");
    const isSelf = nickname === data?.getUserProfile.reqUser;
    console.log(isSelf);
    let postList;
    if (value === "myPosts") {
      postList = data?.getUserProfile.user.posts;
    } else {
      postList = data?.getUserProfile.user.bookmarkedPosts;
    }
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
            <PostContainer>
              {isSelf ? (
                <ButtonContainer>
                  <Button
                    value={"myPosts"}
                    onClick={onClick}
                    isClicked={value === "myPosts"}
                  >
                    내가 쓴 글
                  </Button>
                  <Button
                    value={"bookmarkedPosts"}
                    onClick={onClick}
                    isClicked={value === "bookmarkedPosts"}
                  >
                    북마크
                  </Button>
                </ButtonContainer>
              ) : (
                <ButtonContainer>
                  <Button
                    value={"myPosts"}
                    onClick={onClick}
                    isClicked={value === "myPosts"}
                  >
                    게시글
                  </Button>
                </ButtonContainer>
              )}
              <PostCoulmn />
              {postList?.map((post) => (
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
          </>
        )}
      </>
    );
  }
);
