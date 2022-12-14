const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// Exchange Schema

const exchangeSchema = new Schema(
  {
    sender: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    receiver: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    book: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Book",
    },
    status: {
      type: String,
      required: true,
    },
    replyMessage: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Exchange", exchangeSchema);
