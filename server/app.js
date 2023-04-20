const { AccountModel } = require("./models/account-model");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const express = require("express");
const jsonParser = bodyParser.json();
const mongoose = require("mongoose");

//Initiate app
const app = express();


//add headers to allow localhost access
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

//use cors to allow localhost access
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

//connect to db
const connect = async () => {
  await mongoose.connect(process.env.MONGODB_URL);
  console.log("Connected to MongoDB");
};
connect().catch((err) => console.log(err));

//initiate server port
app.listen(8000, () => console.log("Server is listening on port 8000"));

//add user
app.post("/post", jsonParser, async (req, res) => {
  try {
    const data = new AccountModel({
      accountId: req.body.accountId,
      accountNum: req.body.accountNum,
      accountPin: req.body.accountPin,
      balance: req.body.balance,
    });

    const value = await data.save();

    res.json(value);
  } catch (e) {
    console.log(e.message);
    res.send(e);
  }
});

//withdraw money
app.put("/withdraw/", jsonParser, async (req, res) => {
  const filter = { accountId: req.headers.userid };
  const updateAmt = req.body.withdrawAmt;

  try {
    let doc = await AccountModel.findOne(filter);
    doc.balance = doc.balance - updateAmt;

    await doc.save();

    res.json(doc.balance);
  } catch (e) {
    res.send(e);
  }
});

//deposit money
app.put("/deposit/", jsonParser, async (req, res) => {
  const filter = { accountId: req.headers.userid };
  const updateAmt = req.body.depositAmt;

  try {
    let doc = await AccountModel.findOne(filter);
    doc.balance = doc.balance + Number(updateAmt);

    await doc.save();
    res.json(doc.balance);
  } catch (e) {
    res.send(e);
  }
});

//authorize user
app.get("/auth/", jsonParser, async (req, res) => {
  let filter1 = {
    accountNum: req.headers.accountnum,
  };
  let filter2 = {
    accountPin: req.headers.accountpin,
  };

  let data = {
    accountId: req.body.accountId,
    isValid: null,
  };

  try {
    let userNum = await AccountModel.countDocuments(filter1);
    let userPin = await AccountModel.countDocuments(filter2);
    let userId = await AccountModel.findOne(filter1);

    if (userNum > 0 && userPin > 0) {
      data.isValid = true;
      data.userId = userId;
      res.json(data);
    } else {
      data.userId = userId;
      data.isValid = false;
      res.json(data);
    }
  } catch (e) {
    res.send(e);
  }
});

//verify user account within financial operations
app.get("/verify/", jsonParser, async (req, res) => {
  const filter = { accountId: req.headers.userid };
  try {
    const doc = await AccountModel.findOne(filter);
    res.send(doc);
  } catch (e) {
    console.log(e);
  }
});
