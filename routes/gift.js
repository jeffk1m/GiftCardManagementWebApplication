const express = require("express");
const router = express.Router();
const { ensureAuth } = require("../middleware/auth");
//Description: Login/Landing Page

const Gift = require("../models/Gift");

//Route: GET request to '/'
//@desc Show add page
//@route Get /stories/add
router.get("/add", ensureAuth, (req, res) => {
  //Will look for a page called render within views/layouts
  res.render("giftcard/add");
});

//I don't need ckeditor for this

//@desc Process add form
//@route Post/stories
router.post("/", ensureAuth, async (req, res) => {
  try {
    req.body.user = req.user.id;
    await Gift.create(req.body);
    res.redirect("/dashboard");
  } catch (err) {
    console.error(err);
    res.render("error/500");
  }
});

module.exports = router;
