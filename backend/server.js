const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const zod = require("zod");
const bcrypt = require("bcrypt");
const { createUser } = require("./dist/create-user");
const { getUser } = require("./dist/get-user");

const serverJWTPass = "test1234";

const signupSchema = zod
  .object({
    fullname: zod.string().min(5).max(30),
    username: zod.string().min(5).max(15),
    profileURL: zod.string(),
    bannerURL: zod.string(),
    bio: zod.string(),
    password: zod.string(),
  })
  .required();

const loginSchema = zod
  .object({
    username: zod.string(),
    password: zod.string(),
  })
  .required();

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("twitter is tweeting");
});

// The login route
app.post("/login", async (req, res) => {
  const info = req.body;

  if (loginSchema.safeParse(info).success) {
    try {
      const user = await getUser(info.username);

      if (!user) throw "User not exist";

      const checkpass = await bcrypt.compare(info.password, user.password);

      if (!checkpass) throw "Invalid password";

      const token = jwt.sign({ username: user.username }, serverJWTPass, {
        algorithm: "HS256",
      });

      res.json({ success: "User logged in", token });
    } catch (e) {
      console.log(e);
      res.status(500).json({ ErrorMsg: "Problem on user login" });
    }
  } else {
    res.status(403).json({ ErrorMsg: "Login form is not filled properly" });
  }
});

// The signup route
app.post("/signup", (req, res) => {
  const info = req.body;

  if (signupSchema.safeParse(info).success) {
    try {
      bcrypt.hash(info.password, 10, (err, hash) => {
        // now storing the data in the table
        console.log("database called");
        createUser({ ...info, password: hash });
      });

      res.json({ success: "User signed up successfully" });
    } catch (e) {
      console.log(e);
      res.status(500).json({ ErrorMsg: "Problem on storing your datas" });
    }
  } else {
    res.status(403).json({ ErrorMsg: "Signup form is not filled properly" });
  }
});

// route for making a tweet
app.post("/tweet", (req, res) => {});

// route for getting all the tweets
app.get("/tweets", (req, res) => {});

app.listen(3000, () => {
  console.log("The twitter server is listening to 3000");
});
