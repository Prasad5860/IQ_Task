import { useEffect, useState } from "react";

const UserInfo = () => {
  const [userdata, setUserdata] = useState({});
  useEffect(() => {
    setUserdata(JSON.parse(localStorage.getItem("user")));
  }, []);
  return (
    <>
      <div className="user-info">
        <h2>User Details</h2>
        <table className="table table-striped table-hover">
          <tr>
            <th>Full Name</th>
            <td>
              {userdata.firstname} {userdata.middlename} {userdata.lastname}
            </td>
          </tr>
          <tr>
            <th>Email</th>
            <td>{userdata.email}</td>
          </tr>
          <tr>
            <th>Current Adddress</th>
            <td>{userdata.current}</td>
          </tr>
          <tr>
            <th>Permanent Address</th>
            <td>{userdata.permanent}</td>
          </tr>
        </table>
      </div>
    </>
  );
};
export default UserInfo;
