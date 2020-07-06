import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import React from "react";
import { Link, withRouter } from "react-router-dom";
import Loader from "src/Componentes/Loader";
import PostCard from "src/Componentes/PostCard";
import styled from "styled-components";

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
        }
      }
    }
  }
`;

const CategoryTitle = styled.div`
  display: inline;
  font-size: 30px;
  font-weight: 700;
  color: ${(props) => props.theme.carrotColor};
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
            username,
            text,
            viewcount,
            commentCount,
            createdAt
          }
        }
      } = data;
      return (
        <>
          <Link to={`/category/${categoryTitle}/1`}>
            <CategoryTitle>{categoryTitle}</CategoryTitle>
          </Link>
          <PostCard
            id={id}
            title={title}
            username={username}
            text={text}
            viewcount={viewcount}
            commentCount={commentCount}
            createdAt={createdAt}
          />
          ;
        </>
      );
    }
    return null;
  }
);
