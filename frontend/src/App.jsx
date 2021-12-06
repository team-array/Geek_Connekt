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
import NotesBlog from "./pages/Geeks-Connect/Notes/Notes";

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
                    <Route path="/login" element={<Signin />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/notifications" element={<Notifications />} />
                    <Route path={"/user/:id"} element={<OtherUserProfile />} />
                    <Route path="/notes" element={<NotesBlog />} />
                </Routes>
            </HashRouter>
        </div>
    );
};

export default App;
