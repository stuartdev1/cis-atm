const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema(
  {
    accountId: Number,
    accountNum: Number,
    accountPin: Number,
    balance: Number,
  },
  { collection: "ATM" }
);

const AccountModel = mongoose.model("ATM", accountSchema);

exports.AccountModel = AccountModel;
