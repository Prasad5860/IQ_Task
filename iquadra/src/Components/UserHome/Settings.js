import { useState } from "react";
import Button from "react-bootstrap/Button";
import ModalPage from "./Modal";
const Setting = () => {
  const [showPass, setShowPass] = useState(false);
  const handlePassword = () => {
    setShowPass(!showPass);
  };
  const [showAddress, setShowAddress] = useState(false);
  const handleAddress = () => {
    setShowAddress(!showAddress);
  };
  const [showPhoto, setShowPhoto] = useState(false);
  const handlePhoto = () => {
    setShowPhoto(!showPhoto);
  };
  return (
    <div>
      <h2>Settings</h2>
      <br />
      <br />
      <div
        style={{
          display: "flex",
          height: "100px",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          gap: "60px",
        }}
      >
        {/* password */}
        <Button onClick={handlePassword}>Change Password</Button>
        <br />
        <br />
        <br />
        {/* current address */}
        <Button onClick={handleAddress}>Change Current Address</Button>

        <br />
        <br />
        <br />

        {/* update photo */}
        <Button onClick={handlePhoto}>Change Photo</Button>
      </div>
      <ModalPage
        show={showPass}
        name="password"
        handlePassword={handlePassword}
      />
      <ModalPage show={showPhoto} name="photo" handlePassword={handlePhoto} />
      <ModalPage
        show={showAddress}
        name="address"
        handlePassword={handleAddress}
      />
    </div>
  );
};

export default Setting;
