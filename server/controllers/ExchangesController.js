const Exchange = require("../models/Exchange");

const newExchange = async (req, res) => {
  const { sender, receiver, book } = req.body;

  const alreadyReq = await Exchange.find({ sender: sender, book: book });

  try {
    if (alreadyReq.length) throw Error("Hai già una richiesta in corso");
    const exchange = await Exchange.create({
      sender,
      receiver,
      book,
      status: "waiting",
    });
    res.status(201).json(exchange);
  } catch (err) {
    res.status(400).json({ error: err.message });
    console.log(err.message);
  }
};

const getUserExchanges = async (req, res) => {
  const { id } = req.params;

  try {
    const userSentExchanges = await Exchange.find({ sender: id });
    const userReceivedExchanges = await Exchange.find({ receiver: id });
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

module.exports = { newExchange, getUserExchanges };
