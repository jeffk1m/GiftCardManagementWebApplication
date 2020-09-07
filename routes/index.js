const express = require("express");
//display homepage
//Any route that isn't followed by something
// Something top level like /home /auth /dashboard
// top level meaning nothing follows it
const router = express.Router();
const { ensureAuth, ensureGuest } = require("../middleware/auth");
//Description: Login/Landing Page

//Route: GET request to '/'
router.get("/", ensureGuest, (req, res) => {
  //Will look for a page called render within views/layouts
  res.render("Login", {
    layout: "login",
  });
});

router.get("/dashboard", ensureAuth, (req, res) => {
  //will look for a page called dashboard within views/layout
  res.render("dashboard");
});

module.exports = router;
