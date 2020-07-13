import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import React, { useState } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";
import { BookmarkEmpty, BookmarkFull } from "./Icons";

interface IProps {
  isBookmarked: boolean;
  postId: string;
}

const TOGGLE_POST_BOOKMARK = gql`
  mutation toggleBookmarkPost($id: String!) {
    toggleBookmarkPost(id: $id) {
      ok
    }
  }
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  height: 20px;
`;
const TogglePostBookmark: React.FunctionComponent<IProps> = (props) => {
  const [isBookmarkedS, setIsBookmarked] = useState(props.isBookmarked);
  const [toggleBookmarkPost] = useMutation(TOGGLE_POST_BOOKMARK, {
    variables: { id: props.postId }
  });
  const onClick = async () => {
    try {
      if (isBookmarkedS === true) {
        setIsBookmarked(false);
        toast.warning("북마크가 해제 되었습니다.");
      } else {
        setIsBookmarked(true);
        toast.success("글이 저장되었습니다, 피드에서 확인하세요!");
      }
      await toggleBookmarkPost();
    } catch (error) {
      toast.error("로그인 후 이용해 주세요");
    }
  };
  return (
    <Button onClick={onClick}>
      {isBookmarkedS ? <BookmarkFull /> : <BookmarkEmpty />}
    </Button>
  );
};
export default TogglePostBookmark;
