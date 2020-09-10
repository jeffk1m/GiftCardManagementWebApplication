//Setting up All Dependencies
//for basic webserver funcitonalities
const express = require("express");
//for directory pathing functions
const path = require("path");
//For environment variables
const dotenv = require("dotenv");
//for mongoDB database connection
const mongoose = require("mongoose");
//Idk what morgan is for
const morgan = require("morgan");
//For session based interactivity
const session = require("express-session");
//for authentication
const passport = require("passport");
//Method Override
const methodOverride = require("method-override");
//For User sessions
const MongoStore = require("connect-mongo")(session);
//For basic front end
const exphbs = require("express-handlebars");
//To connect to the Mongo Database
const connectDB = require("./config/db");

//To load CONFIG
dotenv.config({ path: "./config/config.env" });

//Load passport config file
require("./config/passport")(passport);

//Run the connect to DB function
connectDB();

//Setting up Express Application
const app = express();

//BODY PARSER
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//METHOD OVERRIDE
app.use(
  methodOverride(function (req, res) {
    if (req.body && typeof req.body === "object" && "_method" in req.body) {
      let method = req.body._method;
      delete req.body._method;
      return method;
    }
  })
);

//Logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Handlebars Helpers
const { formatDate, editIcon } = require("./helpers/hbs");

//Setting up express handlebars
app.engine(
  ".hbs",
  exphbs({
    helpers: { formatDate, editIcon },
    defaultLayout: "main",
    extname: ".hbs",
  })
);
app.set("view engine", ".hbs");

//Setting up express-sessions middleware
app.use(
  session({
    secret: "keyboard cat",
    reseave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

//Setting up passport middleware
app.use(passport.initialize());
app.use(passport.session());

//set global variable
app.use(function (req, res, next) {
  res.locals.user = req.user || null;
  next();
});

//Set up for static folders
app.use(express.static(path.join(__dirname, "public")));

//ROUTES
//Any requests from "/" will be using the routes from "/routes/index.js"
app.use("/", require("./routes/index"));
app.use("/auth", require("./routes/auth"));
app.use("/giftcards", require("./routes/gift"));
app.use("/about", require("./routes/about.js"));
//Establishes PORT
const PORT = process.env.PORT || 3000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
