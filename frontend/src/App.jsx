import React from "react";
import { config } from "./config";
import { Route, Routes, HashRouter } from "react-router-dom";
import "antd/dist/antd.css";
import Home from "./pages/Home/Home";
import Signin from "./pages/Signin/Signin";
import Dashboard from "./pages/Geeks-Connect/DashBoard/Dashboard";
import AOS from "aos";
import "react-image-crop/dist/ReactCrop.css";
import Notifications from "./pages/Geeks-Connect/Notifications/Notifications";
import HomePageController from "./pages/HomePageController";
import Spinner from "./components/Spinner/Spinner";
import { OtherUserProfile } from "./pages/Geeks-Connect/Profile/components/OtherUserProfile";
import UploadAttendance from "./pages/Geeks-Connect/UploadAttendance/UploadAttendance";
import NotesBlog from "./pages/Geeks-Connect/Notes/Notes";
import PreviewPdf from "./pages/PreviewPdf/PreviewPdf";
import Attendance from "./pages/Geeks-Connect/Attendance/App";
import AttendaceV2 from "./pages/Geeks-Connect/AttendanceV2/AttendaceV2";
import SignUp from "./pages/Signin/SignUp";
import Chat from "./Chat/Chat";
import ChatV2 from "./ChatV2/ChatV2";
import ChatInterface from "./ChatInterface/ChatInterface";

config.console(config.MODE);

const App = () => {
    React.useEffect(() => {
        AOS.init({
            duration: 600,
        });
    });
    return (
        <div className="App">
            <Spinner />
            <HashRouter>
                <Routes>
                    <Route path="/" element={<HomePageController />} />
                    {/* <Route path="/" element={<UploadAttendance />} /> */}
                    <Route path="/login" element={<Signin />} />
                    <Route path="/signUp" element={<SignUp />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/notifications" element={<Notifications />} />
                    <Route path={"/user/:id"} element={<OtherUserProfile />} />
                    <Route path="/notes" element={<NotesBlog />} />
                    <Route path="/preview" element={<PreviewPdf />} />
                    <Route path="/attendance" element={<AttendaceV2 />} />
                    <Route path="/attendance1" element={<Attendance />} />
                    <Route path="/chat" element={<ChatV2 />} />
                    <Route path="/chat/:user" element={<ChatInterface/>}/>
                </Routes>
            </HashRouter>
        </div>
    );
};

export default App;
