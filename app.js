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

//Logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Handlebars Helpers
const { formatDate } = require("./helpers/hbs");

//Setting up express handlebars
app.engine(
  ".hbs",
  exphbs({ helpers: { formatDate }, defaultLayout: "main", extname: ".hbs" })
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

//Set up for static folders
app.use(express.static(path.join(__dirname, "public")));

//ROUTES
//Any requests from "/" will be using the routes from "/routes/index.js"
app.use("/", require("./routes/index"));
app.use("/auth", require("./routes/auth"));
app.use("/giftcards", require("./routes/gift"));

//Establishes PORT
const PORT = process.env.PORT || 3000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
