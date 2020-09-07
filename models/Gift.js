const mongoose = require("mongoose");

//Schema for GiftCard Code
//Unique Identifier probably some randomly generated string
//Value
//Created At Date

const GiftSchema = new mongoose.Schema({
  giftID: {
    type: String,
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Gift", GiftSchema);
