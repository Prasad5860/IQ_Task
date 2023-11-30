import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import "./landing.css";
import Header from "./Header";
import UserInfo from "./UserInfo";
import Contact from "./Contact";
import Setting from "./Settings";
import Remainder from "./Remainders";
const Landing = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("user")) navigate("/");
  });
  return (
    <>
      <div className="landing">
        <Sidebar />
        <div className="rightSidebar">
          <Header />
          <Routes>
            <Route path="/" element={<UserInfo />} />
            <Route path="/userInfo" element={<UserInfo />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/remainders" element={<Remainder />} />
            <Route path="/settings" element={<Setting />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default Landing;
