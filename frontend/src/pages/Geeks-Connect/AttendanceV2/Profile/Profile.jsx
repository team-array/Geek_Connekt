import React from "react";
import "./Profile.scss";
import styled from "styled-components";

const Profile = (props) => {
  const user = props.userData;
  return (
    <div className="profile">
      <Header>
        <HeaderText>Profile Details</HeaderText>
        <AcadamicInformation>
          <MainHeader>Acadamic Information</MainHeader>
          <Main>
              <div style={{width:"max-content",marginRight:"5rem"}}>
                  <p style={{fontWeight:"500",fontSize:"1.1rem"}}>Regulation : <span style={{fontWeight:"400",fontSize:"1rem"}}>{user.Regulation}</span></p>
              </div>
              <div style={{width:"max-content",marginRight:"5rem"}}>
                  <p style={{fontWeight:"500",fontSize:"1.1rem"}}>Programme : <span style={{fontWeight:"400",fontSize:"1rem"}}>{user.Programme}</span></p>
              </div>
              <div style={{width:"max-content",marginRight:"5rem"}}>
                  <p style={{fontWeight:"500",fontSize:"1.1rem"}}>Branch : <span style={{fontWeight:"400",fontSize:"1rem"}}>{user.Branch}</span></p>
              </div>
              <div style={{width:"max-content",marginRight:"5rem"}}>
                  <p style={{fontWeight:"500",fontSize:"1.1rem"}}>Year / Sem : <span style={{fontWeight:"400",fontSize:"1rem"}}>{user.Year}</span></p>
              </div>
              <div style={{width:"max-content",marginRight:"5rem"}}>
                  <p style={{fontWeight:"500",fontSize:"1.1rem"}}>Hall Ticket No : <span style={{fontWeight:"400",fontSize:"1rem"}}>{user.rollNumber}</span></p>
              </div>
              <div style={{width:"max-content",marginRight:"5rem"}}>
                  <p style={{fontWeight:"500",fontSize:"1.1rem"}}>Date of Admission : <span style={{fontWeight:"400",fontSize:"1rem"}}>{user.DateOfAdmission}</span></p>
              </div>
              <div style={{width:"max-content",marginRight:"5rem"}}>
                  <p style={{fontWeight:"500",fontSize:"1.1rem"}}>Section : <span style={{fontWeight:"400",fontSize:"1rem"}}>{user.Section}</span></p>
              </div>
              <div style={{width:"max-content",marginRight:"5rem"}}>
                  <p style={{fontWeight:"500",fontSize:"1.1rem"}}>Status : <span style={{fontWeight:"400",fontSize:"1rem"}}>{user.Status}</span></p>
              </div>
          </Main>
        </AcadamicInformation>
        <AcadamicInformation>
          <MainHeader>Personal Information</MainHeader>
          <Main>
              <div style={{width:"max-content",marginRight:"5rem"}}>
                  <p style={{fontWeight:"500",fontSize:"1.1rem"}}>Full Name : <span style={{fontWeight:"400",fontSize:"1rem"}}>{user.fullName}</span></p>
              </div>
              <div style={{width:"max-content",marginRight:"5rem"}}>
                  <p style={{fontWeight:"500",fontSize:"1.1rem"}}>Gender : <span style={{fontWeight:"400",fontSize:"1rem"}}>{user.Gender}</span></p>
              </div>
              <div style={{width:"max-content",marginRight:"5rem"}}>
                  <p style={{fontWeight:"500",fontSize:"1.1rem"}}>Blood Group : <span style={{fontWeight:"400",fontSize:"1rem"}}>{user.BloodGroup}</span></p>
              </div>
              <div style={{width:"max-content",marginRight:"5rem"}}>
                  <p style={{fontWeight:"500",fontSize:"1.1rem"}}>Dob : <span style={{fontWeight:"400",fontSize:"1rem"}}>{user.birthDate.toString().split("T")[0]}</span></p>
              </div>
              <div style={{width:"max-content",marginRight:"5rem"}}>
                  <p style={{fontWeight:"500",fontSize:"1.1rem"}}>Father Name : <span style={{fontWeight:"400",fontSize:"1rem"}}>{user.FatherName}</span></p>
              </div>
              <div style={{width:"max-content",marginRight:"5rem"}}>
                  <p style={{fontWeight:"500",fontSize:"1.1rem"}}>Mother Name : <span style={{fontWeight:"400",fontSize:"1rem"}}>{user.MotherName}</span></p>
              </div>
              <div style={{width:"max-content",marginRight:"5rem"}}>
                  <p style={{fontWeight:"500",fontSize:"1.1rem"}}>Aadhar : <span style={{fontWeight:"400",fontSize:"1rem"}}>{user.AadharNumber}</span></p>
              </div>
              <div style={{width:"max-content",marginRight:"5rem"}}>
                  <p style={{fontWeight:"500",fontSize:"1.1rem"}}>Mobile : <span style={{fontWeight:"400",fontSize:"1rem"}}>{user.Mobile}</span></p>
              </div>
          </Main>
        </AcadamicInformation>
      </Header>
    </div>
  );
};

const Header = styled.div`
  background-color: #091322;
  height: 70px;
  width: 100%;
  border-bottom: 1px solid #0a1b2c;
  border-radius: 2rem 2rem 0px 0px;
`;

const HeaderText = styled.h3`
  color: #fff;
  font-size: 1.5rem;
  display: block;
  margin: 2rem 30px;
`;

const AcadamicInformation = styled.div`
  // height: 250px;
  // background-color: #6100d4;
  margin: auto 10px;
  border-radius: 1rem;

`;
const AcadamicInformationHeader = styled.div`
  background-color: #091322;
  height: 70px;
  width: 100%;
  border-bottom: 1px solid #0a1b2c;
  border-radius: 1rem 1rem 0px 0px;
`;

const MainHeader = styled.h4`
  color: #fff;
  margin: 30px 30px;
  padding: 18px 15px 14px 15px;
  border-bottom: 1px solid #ddd;
  @media (max-width: 768px) {
    margin: 2rem 0px;
  }
`;

const Main = styled.div`
    display: inline-flex;
    flex-direction: column;
    flex-wrap: wrap;
    padding: 0px 48px;
    align-content: space-between;
    color: #ddd;
    height: 170px;
    @media (max-width: 768px) {
      height: 250px;
    }
    @media (max-width: 616px) {
      height: 270px;
    }
    @media (max-width: 576px) {
      height: 300px;
    }
    @media (max-width: 516px) {
      height: 370px;
      width: max-content;
    }
`;


export default Profile;
