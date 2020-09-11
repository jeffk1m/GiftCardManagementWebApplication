const mongoose = require("mongoose");

//Schema for GiftCard Code story.js is now gift.js
//Unique Identifier probably some randomly generated string
//Value
//Created At Date
var SchemaTypes = mongoose.Schema.Types;

const GiftSchema = new mongoose.Schema({
  giftID: {
    type: Number,
    required: true,
    unique: true,
  },
  value: {
    type: Number,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    default: "deactivated",
    enum: ["activated", "deactivated"],
  },
});

module.exports = mongoose.model("Gift", GiftSchema);
