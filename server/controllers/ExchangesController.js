const Exchange = require("../models/Exchange");
const User = require("../models/User");

const newExchange = async (req, res) => {
  const { sender, receiver, book } = req.body;

  const alreadyReq = await Exchange.find({ sender: sender, book: book });

  try {
    if (alreadyReq.length) throw Error("Hai già richiesto questo libro");
    const exchange = await Exchange.create({
      sender,
      receiver,
      book,
      status: "waiting",
    });
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

const updateExchange = async (req, res) => {
  const { exId } = req.params;
  const newStatus = req.body.status;
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
