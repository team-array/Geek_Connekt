import React from "react";
import axios from "axios";
import { BaseUrl } from "../../../../constants";
import styled from "styled-components";
import Badge from "../../Attendance/components/Badge";
import { cardShadow, hoverEffect, themeColor } from "../../Attendance/utils";
import { PieChartOutlined } from "@ant-design/icons";

const SideBar = (props) => {
  const userData = props.userData;
  console.log(userData);
  let percentage = props.attendance.percentage ;
  try {
    return (
      <Container>
        <ProfileContainer>
          <Avatar src={userData.profilePic} />
          <Name>{userData.rollNumber}</Name>
          <UserName>{userData.fullName}</UserName>
        </ProfileContainer>
        <LinksContainer>
          <Link
            onClick={() => {
              props.setpage(0);
            }}
            className={props.curr === 0 ? "active" : "text-muted"}
          >
            Profile
          </Link>
          <Link
            onClick={() => {
              props.setpage(1);
            }}
            className={props.curr === 1 ? "active" : "text-muted"}
          >
            Attendance
          </Link>
          {props.curr === 0 ? (
            <EarningsCard>
              <CardContent>
                <Chart>
                  <PieChartOutlined />
                </Chart>
                <EarningsText>Attandance</EarningsText>
                <Earning>{percentage}%</Earning>
                {
                  (percentage !== "NA") &&
                    <EarningsIncrease>Required More +{(100-percentage<=25)?"0":75-percentage}%</EarningsIncrease>
                }
              </CardContent>
            </EarningsCard>
          ) : (
            <InfoCard>
              <Card>
                <CardContent2>
                  <Row>
                    <Digit>{props.attendance.sumOfAttendedClasses}</Digit>
                    <InfoContainer>
                      <Titlee>Classes</Titlee>
                      <SubTitle>Attanded class</SubTitle>
                    </InfoContainer>
                  </Row>
                </CardContent2>
              </Card>
              <Card>
                <CardContent2>
                  <Row>
                    <Digit>{props.attendance.sumOfTotalClasses}</Digit>
                    <InfoContainer>
                      <Titlee>Classes</Titlee>
                      <SubTitle>Conducted classes Attanded</SubTitle>
                    </InfoContainer>
                  </Row>
                </CardContent2>
              </Card>
            </InfoCard>
          )}
        </LinksContainer>
      </Container>
    );
  } catch {
    return null;
  }
};

const Container = styled.div`
  width: 30%;
  height: 97vh !important;
  border-radius: 2rem;
  background-color: #091322;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
  @media screen and (min-width: 320px) and (max-width: 1080px) {
    width: 100%;
    height: max-content !important;
  }
`;

const UserName = styled.h3`
  font-size: 1.2rem;
  color: #fff;
  margin-top: 0.6rem;
  @media screen and (min-width: 320px) and (max-width: 1080px) {
    font-size: 1rem;
  }
`;

const ProfileContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Avatar = styled.img`
  height: 7rem;
  border-radius: 6rem;
  margin-top: 20%;
`;

const Name = styled.h1`
  color: white;
  font-size: 1.5rem;
  font-weight: 400;
  margin: 0.8rem 0 0rem 0;
`;

const LinksContainer = styled.div`
  background-color: #162349;
  height: 100%;
  width: 100%;
  border-radius: 2rem;
  display: flex;
  flex-direction: column;
  @media screen and (min-width: 320px) and (max-width: 1080px) {
    width: 100%;
    height: max-content !important;
    padding-bottom: 1.5rem;

  }
`;

const Links = styled.ul`
  list-style-type: none;
  display: flex;
  flex-direction: column;
  padding-top: 1rem;
  height: 60%;
`;

const Link = styled.li`
  margin: 1rem auto 0rem auto;
  display: flex;
  gap: 1rem;
  color: #e4e4e4;
  cursor: pointer;
  font-size: 1.5rem;
  h3 {
    font-weight: 400;
    font-size: 1.5rem;
  }
  svg {
    font-size: 1.1rem;
    margin-top: 3%;
  }
  &:hover {
    color: #fff !important;
  }
`;

const ContactContainer = styled.div`
  width: 60%;
  background-color: #091322;
  color: #c4c4c4;
  height: 15%;
  margin: auto auto;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  padding: 1rem;

  a {
    color: white;
    text-decoration: none;
  }

  @media screen and (min-width: 320px) and (max-width: 1080px) {
    margin-bottom: 2rem;
  }
`;

const EarningsCard = styled.div`
  height: 220px;
  width: 17rem;
  background-color: ${themeColor};
  margin-left: auto;
  margin-right: auto;
  margin-top: 1rem;
  padding: 1rem;
  border-radius: 1rem;
  color: white;
  transition: 0.4s ease-in-out;
  &:hover {
    box-shadow: ${hoverEffect};
  }

  @media screen and (min-width: 320px) and (max-width: 1080px) {
    width: 80%;
  }
`;

const CardContent = styled.div`
  margin: 0rem;
`;

const Chart = styled.div`
  display: flex;
  justify-content: center;
  svg {
    height: 3rem;
    width: 3rem;
  }
`;

const EarningsText = styled.h4`
  text-align: center;
  font-weight: normal;
  padding: 0.4rem 0;
  color: white;
`;

const Earning = styled.h4`
  text-align: center;
  color: white;
`;

const EarningsIncrease = styled.h5`
  text-align: center;
  font-weight: normal;
  background-color: rgba(0, 0, 0, 0.15);
  color: white;
  padding: 0.5rem;
  border-radius: 2rem;
`;


const InfoCard = styled.div`
  width: 20rem;
  background-color: white;
  border-radius: 1rem;
  padding: 1rem 1rem 0rem 1rem;
  color: white;
  box-shadow: ${cardShadow};
  margin-top: 1rem;
  margin-left: auto;
  margin-right: auto;
  transition: 0.4s ease-in-out;
  &:hover {
    box-shadow: ${hoverEffect};
  }
  @media screen and (min-width: 320px) and (max-width: 1080px) {
    width: 80%;
  }
`;

const Card = styled.div`
  background-color: rgba(183, 194, 243, 0.3);
  border-radius: 1rem;
  margin-bottom: 1rem;
`;

const CardContent2 = styled.div`
  padding: 0.7rem 1rem 0.3rem 1rem;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.4rem;
  ${({ justify }) =>
    justify &&
    `
      justify-content:space-around;
      width:90%
  `}
`;
const Digit = styled.div`
  background-color: ${themeColor};
  padding: 0.8rem 1rem;
  font-size: 0.8rem;
  border-radius: 1rem;
`;
const InfoContainer = styled.div`
  margin-left: 0.7rem;
`;
const Titlee = styled.h5`
  color: black;
`;
const SubTitle = styled.h6`
  color: #333333;
  font-weight: normal;
`;

export default SideBar;
