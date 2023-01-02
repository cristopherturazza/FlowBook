const Exchange = require("../models/Exchange");

const newExchange = async (req, res) => {
  const { sender, receiver, book } = req.body;

  try {
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
  const { id } = req.param;
  try {
    const userExchanges = Exchange.find({ sender: id }); // TODO: aggiungere anche receiver
    res.status(200).json(userExchanges);
  } catch (err) {
    res.status(400).json({ error: err.message });
    console.log(err.message);
  }
};

module.exports = { newExchange, getUserExchanges };
