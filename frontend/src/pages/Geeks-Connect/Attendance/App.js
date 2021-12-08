import "./App.scss";
import styled from "styled-components";
import Sidebar from "./components/Sidebar";
import MainContent from "./components/MainContent";
function Attendance() {
  return (
    <Container className="AttendaceDashboard">
      <Sidebar />
      <MainContent />
    </Container>
  );
}

const Container = styled.div`
  
  display: flex;
  height: 97vh;
  background: linear-gradient(to bottom right, white 0%, #e6e4ff 70%);
  border-radius: 2rem;
  @media screen and (min-width: 320px) and (max-width: 1080px) {
    flex-direction: column;
  }
`;

export default Attendance;
