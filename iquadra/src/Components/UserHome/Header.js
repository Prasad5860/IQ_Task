import { NavLink as Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="headerlinks">
      <Link to="/dashboard/userInfo">UserInfo</Link>
      <Link to="/dashboard/contact">Contact</Link>
      <Link to="/dashboard/remainders">Remainders</Link>
      {/* <Link to='/dashboard/todolist'>TODO List</Link> */}
      <Link to="/dashboard/settings">Settings</Link>
    </div>
  );
};

export default Header;
