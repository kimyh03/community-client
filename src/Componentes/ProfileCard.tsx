import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

interface Category {
  title: string;
  id: string;
}

interface IProps {
  key: string;
  id: string;
  nickname: string;
  bio: string;
  email: string;
  likeCount: number;
  favCategories: Category[];
}

const Container = styled.div`
  padding: 0 70px;
  width: 100%;
  border-bottom: ${(props) => props.theme.boxBorder};
  height: 162px;
  display: flex;
  align-items: flex-start;
`;
const Nickname = styled.div`
  font-size: 30px;
  font-weight: 700;
  margin-bottom: 30px;
  color: ${(props) => props.theme.carrotColor};
`;

const Bio = styled.div`
  margin-bottom: 15px;
  font-size: 14px;
  opacity: 0.8;
`;
const LikeCount = styled.div`
  opacity: 0.7;
  font-size: 150px;
`;
const LikeText = styled.div`
  font-weight: 700;
  opacity: 0.7;
  font-size: 30px;
  padding-bottom: 20px;
`;
const Categories = styled.div`
  display: flex;
  color: ${(props) => props.theme.blueColor};
`;
const MainCoulmn = styled.div`
  width: 60%;
  padding-left: 200px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const LikeCoulmn = styled.div`
  width: 40%;
  height: 100%;
  display: flex;
  align-items: flex-end;
  padding-bottom: 20px;
`;

const Category = styled.div`
  margin-right: 10px;
  color: ${(props) => props.theme.blueColor};
`;

const ProfileCard: React.FunctionComponent<IProps> = (props) => {
  return (
    <Container>
      <MainCoulmn>
        <Nickname>{props.nickname}</Nickname>
        <Bio>안녕하세요! 잘 부탁드립니다.</Bio>
        <Categories>
          {props.favCategories &&
            props.favCategories.map((item) => (
              <Link key={item.id} to={`/category/${item.title}/1`}>
                <Category key={item.id}>{`#${item.title}`}</Category>
              </Link>
            ))}
        </Categories>
      </MainCoulmn>
      <LikeCoulmn>
        <LikeCount>{`${props.likeCount}`}</LikeCount>
        <LikeText>개</LikeText>
      </LikeCoulmn>
    </Container>
  );
};

export default ProfileCard;
