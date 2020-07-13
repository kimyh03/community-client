import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import React from "react";
import { withRouter } from "react-router-dom";
import Loader from "src/Componentes/Loader";
import PostCard from "src/Componentes/PostCard";

const GET_POST_DETAIL = gql`
  query seePostDetail($id: String!) {
    seePostDetail(id: $id) {
      post {
        id
        title
        text
        categoryTitle
        userName
        viewCount
        likeCount
        commentCount
        createdAt
        likes {
          id
        }
        comments {
          id
          userName
          text
          createdAt
        }
      }
      isBookmarked
      isLiked
      reqUser
    }
  }
`;

export default withRouter(
  ({
    match: {
      params: { post }
    }
  }) => {
    const { loading, data } = useQuery(GET_POST_DETAIL, {
      variables: { id: post }
    });

    if (loading === true) {
      return <Loader />;
    } else if (!loading && data?.seePostDetail && data.seePostDetail.post) {
      const {
        seePostDetail: {
          post: {
            categoryTitle,
            id,
            title,
            userName,
            text,
            viewCount,
            likeCount,
            commentCount,
            createdAt,
            comments
          },
          isBookmarked,
          isLiked,
          reqUser
        }
      } = data;
      return (
        <>
          <PostCard
            id={id}
            categoryTitle={categoryTitle}
            title={title}
            userName={userName}
            text={text}
            viewCount={viewCount}
            likeCount={likeCount}
            commentCount={commentCount}
            createdAt={createdAt}
            comments={comments}
            isBookmarked={isBookmarked}
            isLiked={isLiked}
            reqUser={reqUser}
          />
        </>
      );
    }
    return null;
  }
);
