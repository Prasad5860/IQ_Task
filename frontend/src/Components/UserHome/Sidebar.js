// import Img from '../../formBgImg.jpg'

import { useEffect, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import { useNavigate } from "react-router-dom";

// import './landing.css'
const Sidebar = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("user")) navigate("/");
  });
  const [userdata, setUserdata] = useState({});
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };
  useEffect(() => {
    setUserdata(JSON.parse(localStorage.getItem("user")));
  }, []);
  return (
    <>
      <div className="sidebar">
        <div className="userimage">
          <img src={userdata.photo} />
        </div>
        <div className="username">
          {userdata.firstname} {userdata.middlename}
        </div>
        <Button onClick={handleLogout}>Logout</Button>
      </div>
    </>
  );
};

export default Sidebar;
