const Exchange = require("../models/Exchange");
const User = require("../models/User");

// Add a new exchange request

const newExchange = async (req, res) => {
  const { sender, receiver, book } = req.body;

  // ! check if there are some active requests
  const alreadyReq = await Exchange.find({
    sender: sender,
    book: book,
    status: "waiting",
  });

  try {
    if (alreadyReq.length)
      throw Error("Hai già una richiesta attiva per questo libro");
    const exchange = await Exchange.create({
      sender,
      receiver,
      book,
      status: "waiting",
    });

    // * Set user alert true
    const alert = await User.updateOne(
      { _id: receiver },
      { $set: { hasAlert: true } },
      { upsert: true }
    );
    console.log(alert);
    res.status(201).json(exchange);
  } catch (err) {
    res.status(400).json({ error: err.message });
    console.log(err.message);
  }
};

// Get all the user exchanges (sent and received)

const getUserExchanges = async (req, res) => {
  const { id } = req.params;

  try {
    const userSentExchanges = await Exchange.find({ sender: id })
      .populate({ path: "sender", select: { fullname: 1 } })
      .populate({ path: "receiver", select: { fullname: 1, email: 1 } })
      .populate({ path: "book", select: { isbn: 1, title: 1, cover: 1 } })
      .sort("-createdAt");
    const userReceivedExchanges = await Exchange.find({ receiver: id })
      .populate({ path: "sender", select: { fullname: 1 } })
      .populate({ path: "receiver", select: { fullname: 1 } })
      .populate({ path: "book", select: { isbn: 1, title: 1, cover: 1 } })
      .sort("-createdAt");
    const reply = {
      sent: userSentExchanges,
      received: userReceivedExchanges,
    };
    res.status(200).json(reply);
  } catch (err) {
    res.status(400).json({ error: err.message });
    console.log(err.message);
  }
};

// Update exchange status

const updateExchange = async (req, res) => {
  const { exId } = req.params;
  const newStatus = req.body.status;

  // replyMessage is optional, if not provided has a default statement (only if accepted)
  const replyMessage =
    req.body.replyMessage ??
    (newStatus === "accepted"
      ? "Contattami all'indirizzo e-mail per concordare lo scambio."
      : undefined);
  const ex = await Exchange.findOne({ _id: exId }).select("sender").lean();

  try {
    if (!newStatus) throw Error("Devi fornire un nuovo valore di stato");
    const update = await Exchange.updateOne(
      { _id: exId },
      {
        status: newStatus,
        replyMessage: replyMessage,
      }
    );

    // * Set user alert true
    const alert = await User.updateOne(
      { _id: ex.sender.toString() },
      { $set: { hasAlert: true } },
      { upsert: true }
    );
    console.log(alert);
    res.status(200).json(update);
  } catch (err) {
    res.status(400).json({ error: err.message });
    console.log(err.message);
  }
};

module.exports = { newExchange, getUserExchanges, updateExchange };
