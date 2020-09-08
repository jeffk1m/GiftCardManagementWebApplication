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

// @desc Show edit page
// @route GET /stories/edit/id

router.get("/edit/:id", ensureAuth, async (req, res) => {
  //Will look for a page called render within views/layouts
  const gift = await Gift.findOne({
    _id: req.params.id,
  }).lean();
  if (!gift) {
    return res.render("error/404");
  }
  if (gift.user != req.user.id) {
    res.redirect(`/giftcards`);
  } else {
    res.render("giftcard/edit", {
      gift,
    });
  }
});

// @desc Show All Stories
// @route Get /stories/add

router.get("/", ensureAuth, async (req, res) => {
  try {
    const giftcards = await Gift.find({})
      .populate("user")
      .sort({ createdAt: "desc" })
      .lean();
    res.render("giftcard/index", {
      giftcards,
    });
  } catch (err) {
    console.log(err);
    res.render("error/500");
  }
});

//UPDATE STORY
// PUT /stories/:id
router.put("/:id", ensureAuth, async (req, res) => {
  //Will look for a page called render within views/layouts
  let gift = await Gift.findById(req.params.id).lean();

  if (!gift) {
    return res.render("error/404");
  }

  if (gift.user != req.user.id) {
    res.redirect("/giftcards");
  } else {
    gift = await Gift.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
      runValidators: true,
    });
  }
  res.redirect("/dashboard");
});

module.exports = router;
