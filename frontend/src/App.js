import { Route, Router, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Register from "./Components/Signup-in/Register";
import Signin from "./Components/Signup-in/Signin";
import Landing from "./Components/UserHome/Landing";
import { useEffect } from "react";

function App() {
  const navigate = useNavigate();
  return (
    <div className="App">
      {/* <Signup/> */}
      {/* <Register/> */}
      {/* <Landing/> */}
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard/*" element={<Landing />} />
      </Routes>
    </div>
  );
}

export default App;
