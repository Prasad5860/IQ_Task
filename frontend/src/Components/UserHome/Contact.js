import axios from "axios";
import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
const Contact = () => {
  const [userdata, setUserdata] = useState({});
  const [details, setDetails] = useState({});
  const [search, setSearch] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [load, setLoad] = useState(false);
  useEffect(() => {
    setUserdata(JSON.parse(localStorage.getItem("user")));
  }, []);
  const [contactDetails, setContactDetails] = useState([]);
  const getContactData = () => {
    axios
      .post("http://localhost:1111/getContact", { email: userdata.email })
      .then((val) => {
        setContactDetails(val.data);
      });
  };
  getContactData();

  const addContact = (e) => {
    e.preventDefault();
    setLoad(true);
    axios
      .post("http://localhost:1111/addContact", {
        details,
        email: userdata.email,
      })
      .then((val) => {
        setLoad(false);
        alert("contact added");
      })
      .catch((err) => {
        setLoad(false);
        alert("error while adding");
      });
  };
  const updateDetails = (e) => {
    setDetails({
      ...details,
      [e.target.name]: e.target.value,
    });
  };
  const searchTheData = () => {
    if (!search || search.length == 0) return;
    let data = contactDetails.filter((item) => {
      return (
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.email.toLowerCase().includes(search.toLowerCase()) ||
        item.address.toLowerCase().includes(search.toLowerCase())
      );
    });
    setSearchData(data);
  };

  return (
    <>
      <h2 className="contact">Contact</h2>
      <div className="search">
        <input
          type="text"
          placeholder="Search Here ..."
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={searchTheData}>Search</button>
      </div>
      <button
        type="button"
        className="btn btn-primary contact-button"
        data-toggle="modal"
        data-target="#exampleModal"
      >
        Add Contact
      </button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <form onSubmit={addContact}>
            <div className="modal-content">
              <div className="modal-header bg-primary text-white">
                <h5 className="modal-title" id="exampleModalLabel">
                  Contact Details
                </h5>
              </div>
              <div className="modal-body">
                <table className="modaltable">
                  <tr>
                    <th>Name</th>
                    <td>
                      :{" "}
                      <input
                        type="text"
                        name="name"
                        placeholder="Enter name"
                        onChange={updateDetails}
                        required
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>Number</th>
                    <td>
                      :{" "}
                      <input
                        type="number"
                        name="number"
                        placeholder="Enter Number"
                        onChange={updateDetails}
                        required
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>Email</th>
                    <td>
                      :{" "}
                      <input
                        type="email"
                        name="email"
                        placeholder="Enter Email"
                        onChange={updateDetails}
                        required
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>DOB</th>
                    <td>
                      :{" "}
                      <input
                        type="date"
                        name="date"
                        placeholder="Date of Birth"
                        onChange={updateDetails}
                        required
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>Relation</th>
                    <td>
                      :{" "}
                      <input
                        type="text"
                        name="relation"
                        placeholder="Relation"
                        onChange={updateDetails}
                        required
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>Address</th>
                    <td>
                      :{" "}
                      <textarea
                        name="address"
                        placeholder="Enter Address"
                        onChange={updateDetails}
                      ></textarea>
                    </td>
                  </tr>
                </table>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button type="submit" className="btn btn-primary">
                  {load ? <i class="fas fa-spinner fa-pulse"></i> : ""} Save
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <br />
      {search.length > 0 ? (
        <div className="contact-cards">
          {searchData.length > 0 ? (
            searchData.map((ele) => {
              return (
                <>
                  <Card style={{ width: "18rem" }}>
                    <Card.Body>
                      <Card.Title
                        style={{ textTransform: "capitalize !important" }}
                      >
                        {ele.name}
                      </Card.Title>
                      <Card.Subtitle className="mb-2 text-muted">
                        {ele.email} <br />
                        +91 {ele.number}
                      </Card.Subtitle>
                      <Card.Text>
                        {ele.relation ? <>{ele.relation}</> : <></>}
                        <br />
                        {ele.address}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </>
              );
            })
          ) : (
            <></>
          )}
        </div>
      ) : (
        <></>
      )}
      {/* Contact details */}
      <div className="contact-cards">
        {contactDetails.length > 0 ? (
          contactDetails.map((ele) => {
            return (
              <>
                <Card style={{ width: "18rem" }}>
                  <Card.Body>
                    <Card.Title
                      style={{ textTransform: "capitalize !important" }}
                    >
                      {ele.name}
                    </Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      {ele.email} <br />
                      +91 {ele.number}
                    </Card.Subtitle>
                    <Card.Text>{ele.address}</Card.Text>
                  </Card.Body>
                </Card>
              </>
            );
          })
        ) : (
          <>
            <h2>
              please wait loading <i class="fas fa-spinner fa-pulse"></i>
            </h2>
          </>
        )}
      </div>
    </>
  );
};
export default Contact;
