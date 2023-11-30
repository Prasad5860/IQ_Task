const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
// prasad kg57PImRIO9sPLU5

const url =
  "mongodb+srv://prasad:kg57PImRIO9sPLU5@userdetail.p6qbokw.mongodb.net/IqTask?retryWrites=true&w=majority";
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
const connect = () => {
  mongoose
    .connect(url)
    .then(() => {
      app.listen(1111, () => {
        console.log("connected to the database & http://localhost:1111");
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
connect();
const Infoschema = mongoose.Schema({
  firstname: {
    type: String,
    require: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  middlename: {
    type: String,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  current: {
    type: String,
    require: true,
  },
  permanent: {
    type: String,
    require: true,
  },
  photo: {
    type: String,
    default:
      "https://pixlok.com/wp-content/uploads/2021/03/default-user-profile-picture.jpg",
  },
  contact: {
    type: Object,
    default: [],
  },
  remainder: {
    type: Object,
    default: [],
  },
});
const infoModel = mongoose.model("login", Infoschema);

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  infoModel.find({ email }).then((val) => {
    if (val[0].password != password) {
      res.setHeader("Content-Type", "application/json");
      res.statusCode = 400;
      res.json({ message: "Incorrect Password" });
    } else {
      res.statusCode = 201;
      res.setHeader("Content-Type", "application/json");
      res.json(val[0]);
    }
  });
});
app.post("/register", (req, res, next) => {
  const {
    firstname,
    middlename,
    lastname,
    email,
    mobile,
    password,
    confirmpassword,
    currentAddress,
    permanentAddress,
    photo,
  } = req.body;
  if (password != confirmpassword) {
    res.setHeader("Content-Type", "application/json");
    res.statusCode = 400;
    res.json({ message: "password should match with confirm password" });
    return;
  }
  infoModel.find({ email }).then((val) => {
    if (val.length >= 1) {
      res.setHeader("Content-Type", "application/json");
      res.statusCode = 400;
      res.json({ message: "User Already Exists" });
      return;
    }
  });
  if (!middlename) middlename: "";
  const data = new infoModel({
    firstname,
    lastname,
    email,
    mobile,
    password,
    current: currentAddress,
    permanent: permanentAddress,
    photo,
    middlename,
  });
  try {
    data.save();
    res.statusCode = 201;
    res.setHeader("Content-Type", "application/json");
    res.json({ message: "user created" });
  } catch (error) {
    res.statusCode = 400;
    res.setHeader("Content-Type", "application/json");
    res.json({ message: "Register Again" });
  }
});

app.post("/changepassword", (req, res) => {
  const { email, password } = req.body;
  infoModel
    .updateMany({ email }, { $set: { password: password } })
    .then((val) => {
      res.statusCode = 201;
      res.setHeader("Content-Type", "application/json");
      res.json({ message: "Password Changed Successfully" });
    })
    .catch((err) => {
      res.statusCode = 400;
      res.setHeader("Content-Type", "application/json");
      res.json({ message: "Password not Changed" });
    });
});

app.post("/changeaddress", (req, res) => {
  const { email, address } = req.body;
  //   console.log(address);
  infoModel
    .updateMany({ email }, { $set: { current: address } })
    .then((val) => {
      res.statusCode = 201;
      res.setHeader("Content-Type", "application/json");
      infoModel.find({ email }).then((val) => {
        res.statusCode = 201;
        res.setHeader("Content-Type", "application/json");
        res.json(val[0]);
      });
    })
    .catch((err) => {
      res.statusCode = 400;
      res.setHeader("Content-Type", "application/json");
      res.json({ message: "Address not Changed" });
    });
});

app.post("/changephoto", (req, res) => {
  const { email, photo } = req.body;
  infoModel
    .updateMany({ email }, { $set: { photo: photo } })
    .then((val) => {
      res.statusCode = 201;
      res.setHeader("Content-Type", "application/json");
      infoModel.find({ email }).then((val) => {
        res.statusCode = 201;
        res.setHeader("Content-Type", "application/json");
        res.json(val[0]);
      });
    })
    .catch((err) => {
      res.statusCode = 400;
      res.setHeader("Content-Type", "application/json");
      res.json({ message: "Photo not Changed" });
    });
});

app.post("/addContact", (req, res) => {
  const { email, details } = req.body;
  infoModel
    .find({ email })
    .then((data) => {
      let contact = data[0].contact;
      contact.push(details);
      infoModel
        .updateMany({ email }, { $set: { contact: contact } })
        .then((val) => {
          console.log(val);
          res.send("ok");
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => {
      console.log("error");
    });
});

app.post("/getContact", (req, res) => {
  const { email } = req.body;
  infoModel
    .find({ email })
    .then((data) => {
      res.send(data[0].contact);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/addremainder", (req, res) => {
  const { email, remainder } = req.body;
  let allremainder = [];
  infoModel
    .find({ email })
    .then((val) => {
      allremainder = val[0].remainder;
      allremainder.push({
        description: remainder,
      });
      infoModel
        .updateMany({ email }, { $set: { remainder: allremainder } })
        .then((val) => {
          res.send("ok");
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => console.log(err));
});
app.post("/remainder", (req, res) => {
  const { email } = req.body;
  infoModel
    .find({ email })
    .then((val) => {
      res.send(val[0].remainder);
    })
    .catch((err) => console.log(err));
});
