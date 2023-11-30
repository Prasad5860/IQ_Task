import axios from "axios";
import { useEffect, useState } from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const Remainder = () => {
  const [userdata, setUserdata] = useState({});
  const [remainders, setRemainder] = useState([]);
  const [remainder, setRem] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  useEffect(() => {
    setUserdata(JSON.parse(localStorage.getItem("user")));
  }, []);
  const handleRemainder = () => {
    axios
      .post("http://localhost:1111/addremainder", {
        remainder,
        email: userdata.email,
      })
      .then((val) => {
        console.log(val);
        handleClose();
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  useEffect(() => {
    axios
      .post("http://localhost:1111/remainder", {
        email: userdata.email,
      })
      .then((val) => {
        setRemainder(val.data);
      });
  });
  return (
    <>
      <h2>Remainder's</h2>
      <br />
      <br />

      <Button variant="primary" onClick={handleShow}>
        Add Remainder
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Remainder</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="text"
            placeholder="add remainder"
            onChange={(e) => setRem(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleRemainder}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
      <br />
      <br />
      <br />
      {remainders.length > 0 ? (
        remainders.map((ele) => {
          return (
            <Alert key={"success"} variant={"success"}>
              {ele.description}
            </Alert>
          );
        })
      ) : (
        <>No Remainders</>
      )}
    </>
  );
};

export default Remainder;
