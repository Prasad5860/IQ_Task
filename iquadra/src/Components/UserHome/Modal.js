import { useEffect, useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function ModalPage({ show, handlePassword, name }) {
  const [userdata, setUserdata] = useState({});
  useEffect(() => {
    setUserdata(JSON.parse(localStorage.getItem("user")));
  }, []);
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [photo, setPhoto] = useState("");
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const ChangePassword = () => {
    axios
      .post("http://localhost:1111/changepassword", {
        password,
        email: userdata.email,
      })
      .then(() => {
        alert("password changed");
        handlePassword();
      })
      .catch((err) => {
        alert("Make sure having good Internet Connection");
      });
  };
  const changeAddress = (e) => {
    setAddress(e.target.value);
  };
  const updateAddress = () => {
    axios
      .post("http://localhost:1111/changeaddress", {
        address,
        email: userdata.email,
      })
      .then((val) => {
        alert("address changed");
        localStorage.removeItem("user");
        console.log(val.data);
        localStorage.setItem("user", JSON.stringify(val.data));
        handlePassword();
      })
      .catch((err) => {
        alert("Make sure having good Internet Connection");
      });
  };
  const photoTaken = (e) => {
    let file = e.target.files[0];
    if (!file || !/image\/.*/.test(file.type)) return;
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      setPhoto(reader.result);
    };
    reader.onerror = function () {
      alert("please select profile photo");
    };
  };
  const photoUpdate = () => {
    axios
      .post("http://localhost:1111/changephoto", {
        photo,
        email: userdata.email,
      })
      .then((val) => {
        alert("photo changed");
        localStorage.removeItem("user");
        localStorage.setItem("user", JSON.stringify(val.data));
        handlePassword();
      })
      .catch((err) => {
        alert("Make sure having good Internet Connection");
      });
  };
  if (name === "password") {
    return (
      <div
        className="modal show"
        style={{ display: "block", position: "initial" }}
      >
        <Modal show={show}>
          <Modal.Dialog>
            <Modal.Header>
              <Modal.Title>Change Password</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <input
                placeholder="enter new password"
                onChange={handlePasswordChange}
              />
            </Modal.Body>

            <Modal.Footer>
              <Button variant="secondary" onClick={handlePassword}>
                Close
              </Button>
              <Button variant="primary" onClick={ChangePassword}>
                Save
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal>
      </div>
    );
  } else if (name === "address") {
    return (
      <>
        <div
          className="modal show"
          style={{ display: "block", position: "initial" }}
        >
          <Modal show={show}>
            <Modal.Dialog>
              <Modal.Header>
                <Modal.Title>Change Current Address</Modal.Title>
              </Modal.Header>

              <Modal.Body>
                <textarea
                  placeholder="Enter Current Address"
                  onChange={changeAddress}
                ></textarea>
              </Modal.Body>

              <Modal.Footer>
                <Button variant="secondary" onClick={handlePassword}>
                  Close
                </Button>
                <Button variant="primary" onClick={updateAddress}>
                  Save
                </Button>
              </Modal.Footer>
            </Modal.Dialog>
          </Modal>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div
          className="modal show"
          style={{ display: "block", position: "initial" }}
        >
          <Modal show={show}>
            <Modal.Dialog>
              <Modal.Header>
                <Modal.Title>Change Current Photo</Modal.Title>
              </Modal.Header>

              <Modal.Body>
                <input type="file" onChange={photoTaken} />
              </Modal.Body>

              <Modal.Footer>
                <Button variant="secondary" onClick={handlePassword}>
                  Close
                </Button>
                <Button variant="primary" onClick={photoUpdate}>
                  Save
                </Button>
              </Modal.Footer>
            </Modal.Dialog>
          </Modal>
        </div>
      </>
    );
  }
}

export default ModalPage;
