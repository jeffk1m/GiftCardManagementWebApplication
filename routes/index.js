const express = require("express");
//display homepage
//Any route that isn't followed by something
// Something top level like /home /auth /dashboard
// top level meaning nothing follows it
const router = express.Router();
const { ensureAuth, ensureGuest } = require("../middleware/auth");
//Description: Login/Landing Page

const Gift = require("../models/Gift");

//Route: GET request to '/'
router.get("/", ensureGuest, (req, res) => {
  //Will look for a page called render within views/layouts
  res.render("Login", {
    layout: "login",
  });
});

router.get("/dashboard", ensureAuth, async (req, res) => {
  try {
    const giftcards = await Gift.find({ user: req.user.id }).lean();
    res.render("dashboard", {
      name: req.user.firstName,
      giftcards,
    });
  } catch (err) {
    console.log(err);
    res.render("error/500");
  }
  //will look for a page called dashboard within views/layout
});

module.exports = router;
