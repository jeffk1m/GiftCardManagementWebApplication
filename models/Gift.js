const mongoose = require("mongoose");

//Schema for GiftCard Code story.js is now gift.js
//Unique Identifier probably some randomly generated string
//Value
//Created At Date

const GiftSchema = new mongoose.Schema({
  giftID: {
    type: Number,
    required: true,
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
});

module.exports = mongoose.model("Gift", GiftSchema);
