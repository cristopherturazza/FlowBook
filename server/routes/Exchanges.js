const express = require("express");

const router = express.Router();
const authChecker = require("../middleware/authChecker");
const {
  newExchange,
  getUserExchanges,
  updateExchange,
} = require("../controllers/ExchangesController");

router.use(authChecker);

// create a new exchange
router.post("/new", newExchange);

// get all the exchange of the current user
router.get("/:id", getUserExchanges);

// update the exchange status
router.patch("/:exId", updateExchange);

module.exports = router;
