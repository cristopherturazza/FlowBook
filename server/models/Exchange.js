const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const exchangeSchema = new Schema(
  {
    sender: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    receiver: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    book: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    isReplySeen: Boolean,
    replyMessage: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Exchange", exchangeSchema);
