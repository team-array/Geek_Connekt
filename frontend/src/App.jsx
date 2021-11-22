import React from 'react';
import {config} from "./config";
import {Route, Routes,HashRouter} from "react-router-dom";
import 'antd/dist/antd.css';
import Home from "./pages/Home/Home";
import Signin from "./pages/Signin/Signin";
import Signup from "./pages/Signup/Signup";

config.console(config.MODE);

const App = () => {
  return (
    <div className="App">
      <HashRouter >
        <Routes>
          <Route  path="/" element={<Home/>} />
          <Route  path="/signin" element={<Signin/>} />
          <Route  path="/signup" element={<Signup/>} />
        </Routes>
      </HashRouter>
    </div>
  )
}

export default App;