import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import React, { useState } from "react";
import { toast } from "react-toastify";
import useInput from "src/Hooks/UseInput";
import styled from "styled-components";
import { Check, Edit } from "./Icons";

const Text = styled.div``;

const Container = styled.div`
  display: flex;
  align-items: center;
  opacity: 0.8;
  font-size: 14px;
`;

const EditBioInput = styled.input`
  background: none;
  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom: 1px solid #e6e6e6;
  min-width: 200px;
`;

const EditBioButton = styled.button`
  background: none;
  border: none;
  margin-top: 3px;
`;

const EDIT_BIO = gql`
  mutation editBio($bio: String!) {
    editBio(bio: $bio) {
      ok
    }
  }
`;

const Bio = (props) => {
  const [action, setAction] = useState("normal");
  const { value, onChange } = useInput("");

  const [editBio] = useMutation(EDIT_BIO, {
    variables: { bio: value }
  });

  const onClick = async (event) => {
    event.preventDefault();
    if (action === "normal") {
      setAction("edit");
    } else {
      await editBio();
      setAction("normal");
      window.location.reload();
      toast.success("인사말이 변경되었습니다!");
    }
  };
  if (props.isSelf) {
    if (action === "normal") {
      return (
        <Container>
          <Text>{props.bio ? props.bio : "인사말을 추가 해보세요!"}</Text>
          <EditBioButton onClick={onClick}>
            <Edit />
          </EditBioButton>
        </Container>
      );
    } else if (action === "edit") {
      return (
        <Container>
          <EditBioInput
            value={value}
            onChange={onChange}
            placeholder={props.bio}
          ></EditBioInput>
          <EditBioButton onClick={onClick}>
            <Check />
          </EditBioButton>
        </Container>
      );
    } else return null;
  } else {
    return <Text>{props.bio}</Text>;
  }
};
export default Bio;
