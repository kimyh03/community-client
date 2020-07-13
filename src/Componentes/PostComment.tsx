import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import React from "react";
import TextareaAutosize from "react-autosize-textarea";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import useInput from "src/Hooks/UseInput";
import styled from "styled-components";

interface Comment {
  id: string;
  userName: string;
  text: string;
  createdAt: string;
}

interface IProps {
  comments: [Comment];
  commentCount: any;
  postId: string;
  reqUser: string;
}

const CREATE_COMMENT = gql`
  mutation createComment($postId: String!, $text: String!) {
    createComment(postId: $postId, text: $text) {
      ok
    }
  }
`;

const DELETE_COMMENT = gql`
  mutation deleteComment($id: String!) {
    deleteComment(id: $id) {
      ok
    }
  }
`;

const CommentContainer = styled.div`
  margin-top: 20px;
`;

const Title = styled.div`
  font-weight: 700;
  font-size: 17px;
`;

const CommentList = styled.ul`
  margin: 20px 0;
  display: flex;
  flex-direction: column;
`;

const Comment = styled.li`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 10px 0;
  :not(:last-child) {
    border-bottom: ${(props) => props.theme.boxBorder};
  }
`;

const UserName = styled.div`
  font-weight: 700;
  margin-bottom: 5px;
`;

const Text = styled.div`
  width: 850px;
  margin: 10px 0;
  word-break: break-all;
  word-wrap: normal;
  line-height: 17px;
`;

const CreatedAt = styled.div`
  opacity: 0.7;
`;

const CommentForm = styled.form`
  margin: 0;
  margin: auto;
  width: 800px;
  min-height: 50px;
  border: 3px solid #e6e6e6;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const TextArea = styled(TextareaAutosize)`
  width: 700px;
  height: 90%;
  font-size: 15px;
  border: none;
  opacity: 0.7;
  padding: 10px;
  resize: none;
  &:focus {
    outline: none;
  }
`;

const Button = styled.button`
  width: 10%;
  height: 30px;
  margin: 5px 0;
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

const DeleteButton = styled.button`
  color: ${(props) => props.theme.carrotColor};
  border: none;
  background: white;
  opacity: 0.7;
  font-weight: 700;
  :hover {
    opacity: 1;
  }
`;

const PostComment: React.FunctionComponent<IProps> = (props) => {
  const newComment = useInput("");
  const [createComment] = useMutation(CREATE_COMMENT, {
    variables: { postId: props.postId, text: newComment.value }
  });

  const [deleteComment] = useMutation(DELETE_COMMENT);

  const onKeyPress = async (event) => {
    if (event.which === 13) {
      try {
        await createComment();
        toast.success("댓글이 등록되었습니다!");
        window.location.reload();
      } catch (error) {
        toast.error("잘못된 접근입니다.");
      }
    }
  };
  const onSubmit: React.FormEventHandler = async (event) => {
    try {
      await createComment();
      toast.success("댓글이 등록되었습니다!");
    } catch (error) {
      toast.error("잘못된 접근입니다.");
    }
    return null;
  };

  const onClick = async (event) => {
    try {
      await deleteComment({ variables: { id: event.target.id } });
      window.location.reload();
      toast.warning("댓글이 삭제되었습니다!");
    } catch (error) {
      toast.error("잘못된 접근입니다.");
    }
  };
  return (
    <>
      <CommentContainer>
        <Title>{`댓글 (${props.commentCount})`}</Title>
        <CommentList>
          {props.comments &&
            props.comments.length > 0 &&
            props.comments.map((comment) => {
              const isSelf = props.reqUser === comment.userName;
              return (
                <Comment key={comment.id}>
                  {isSelf ? (
                    <Wrapper>
                      <Link to={`/user/${comment.userName}`}>
                        <UserName>{comment.userName}</UserName>
                      </Link>
                      <DeleteButton id={comment.id} onClick={onClick}>
                        X
                      </DeleteButton>
                    </Wrapper>
                  ) : (
                    <Link to={`/user/${comment.userName}`}>
                      <UserName>{comment.userName}</UserName>
                    </Link>
                  )}
                  <Text>{comment.text}</Text>
                  <CreatedAt>{comment.createdAt.substring(0, 10)}</CreatedAt>
                </Comment>
              );
            })}
        </CommentList>
        <CommentForm onSubmit={onSubmit}>
          <TextArea
            onKeyPress={onKeyPress}
            placeholder={"댓글을 남겨보세요"}
            value={newComment.value}
            onChange={newComment.onChange}
          ></TextArea>
          <Button>등록</Button>
        </CommentForm>
      </CommentContainer>
    </>
  );
};

export default PostComment;
