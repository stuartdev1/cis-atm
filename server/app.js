const express = require("express");
const mongoose = require("mongoose");
const { AccountModel } = require("./models/account-model");
const bodyParser = require("body-parser");
require("dotenv").config();
const cors = require("cors");

const app = express();

const jsonParser = bodyParser.json();
const connect = async () => {
  await mongoose.connect(process.env.MONGODB_URL);
  console.log("Connected to MongoDB");
};
connect().catch((err) => console.log(err));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.listen(8000, () => console.log("Server is listening on port 8000"));

//post
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

app.put("/update/", jsonParser, async (req, res) => {
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

app.get("/auth/:accountNum/:accountPin", jsonParser, async (req, res) => {
  let filter1 = {
    accountNum: req.params.accountNum,
  };
  let filter2 = {
    accountPin: req.params.accountPin,
  };

  let data = {
    userId: req.body.userId,
    isValid: true,
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

app.get(
  app.get("/verify/", jsonParser, async (req, res) => {
    console.log(req.headers);
    const filter = { accountId: req.headers.userid };
    console.log("verify");
    try {
      const doc = await AccountModel.findOne(filter);
      res.send(doc);
    } catch (e) {
      console.log(e);
    }
  })
);
