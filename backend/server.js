const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const zod = require("zod");
const bcrypt = require("bcrypt");
const { createUser } = require("./dist/create-user");
const { getUser } = require("./dist/get-user");
const { getProfile } = require("./dist/get-profile");
const { createTweet } = require("./dist/create-tweet");
const { getTweets } = require("./dist/get-tweets");

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
      res
        .status(500)
        .json({ success: false, ErrorMsg: "Problem on storing your datas" });
    }
  } else {
    res
      .status(403)
      .json({ success: false, ErrorMsg: "Signup form is not filled properly" });
  }
});

app.get("/profile", async (req, res) => {
  const authToken = req.headers.authorization;

  try {
    const result = jwt.verify(authToken, serverJWTPass);

    const profile = await getProfile(result.username);

    res.json({ success: true, ...profile });
  } catch (e) {
    res.status(401).json({ success: false, ErrorMsg: "unauthorized" });
  }
});

// route for making a tweet
app.post("/tweet", async (req, res) => {
  const info = req.body;
  const authToken = req.headers.authorization;

  try {
    const result = jwt.verify(authToken, serverJWTPass);

    const tweet = await createTweet({
      tweetText: info.tweet,
      userId: info.userId,
    });

    res.json({ success: true, ...tweet });
  } catch (e) {
    console.log(e);

    res.status(411).json({ success: false, ErrorMsg: "unauthorized" });
  }
});

// route for getting all the tweets
app.get("/tweets", async (req, res) => {
  const skip = parseInt(req.query.skip);
  const take = parseInt(req.query.take);
  const token = req.headers.authorization;

  try {
    const result = jwt.verify(token, serverJWTPass);

    const tweets = await getTweets(skip, take);

    res.json({ success: true, tweets: tweets });
  } catch (e) {
    console.log(e);
    res.status(411).json({ success: false, ErrorMsg: "unauthorized" });
  }
});

app.listen(3000, () => {
  console.log("The twitter server is listening to 3000");
});
