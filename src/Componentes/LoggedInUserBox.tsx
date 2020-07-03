import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import CarrotText from "./CarrotText";
import Loader from "./Loader";

interface User {
  id: string;
  nickname: string;
}

interface GetMeResponse {
  getMe: User;
}

const GET_ME = gql`
  {
    getMe {
      id
      nickname
    }
  }
`;

const Container = styled.div`
  width: 100%;
  height: 120px;
  margin: 10px 0;
  background: white;
  border: ${(props) => props.theme.boxBorder};
  display: flex;
  flex-direction: column;
  justify-content: center;
  justify-items: center;
`;

const Title = styled.div`
  margin: 10px 0;
`;
const Greeting = styled.span`
  margin: 15px 0;
`;

const Nickname = styled.span`
  margin: 15px 0;
  font-weight: 700;
  color: ${(props) => props.theme.carrotColor};
`;

const Button = styled.button`
  width: 80%;
  height: 25px;
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
    opacity: 0.7;
  }
`;

const Wrapper = styled.div`
  margin: 15px 0;
  display: flex;
  justify-content: center;
`;

const SLink = styled(Link)`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const LoggedInUserBox: React.FunctionComponent = () => {
  const { loading, data } = useQuery<GetMeResponse>(GET_ME);

  return (
    <>
      <Title>
        <CarrotText text="내정보" />
      </Title>
      <Container>
        {loading ? (
          <Loader />
        ) : (
          <>
            <Wrapper>
              <Nickname>{`${data?.getMe.nickname}`}</Nickname>
              <Greeting> 님 안녕하세요!</Greeting>
            </Wrapper>
            <SLink to={`/user/${data?.getMe.nickname}`}>
              <Button>내피드</Button>
            </SLink>
          </>
        )}
      </Container>
    </>
  );
};

export default LoggedInUserBox;