import logo from "./logo.svg";
import "./App.css";
import { Route, Routes, HashRouter } from "react-router-dom";
import LoginPage from "./Components/loginPage/LoginPage";
import ApproveRequests from "./Components/approveRequests/ApproveRequests";
import HomePageController from "./Components/HomePageController";

function App() {
    return (
        <div className="App">
            <HashRouter>
                <Routes>
                    <Route path="/" element={<HomePageController />} />
                </Routes>
            </HashRouter>
        </div>
    );
}

export default App;
