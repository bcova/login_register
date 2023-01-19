const express = require("express");

const usersRouter = express.Router();

const jwt = require("jsonwebtoken");
const router = require("../api");

const { createUser, getUser, getUserByUsername } = require("../db/users");

usersRouter.post("/register", async (req, res, next) => {
  console.log("usersRouter.post");
  const { username, password, email, first_name, last_name } = req.body;

  try {
    const _user = await getUserByUsername(username);
    if (_user) {
      next({ name: "Guess what...", message: "Nope" });
    }
    const user = await createUser({
      username,
      password,
      email,
      first_name,
      last_name,
    });
    const userID = user.id;
    const token = jwt.sign(
      {
        id: userID,
        username: user.username,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1w" }
    );
    res.send({
      message: "Thanks...you signed up..wow",
      token,
      userID,
    });
  } catch ({ name, message }) {
    next({ name, message });
  }
});

usersRouter.post("/login", async (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    next({
      name: "Missing credentials error",
      message: "Either username or password is missing/incomplete.",
    });
  }

  try {
    const _user = await getUserByUsername(username);
    if (!_user) {
      next({
        error: "incorrect username or password",
        message: "incorrect username or password",
        name: "Invalid credentials.",
      });
    }

    const user = await getUser({ username, password });
    if (!user) {
      next({
        error: "incorrect username or password",
        message: "incorrect username or password",
        name: "Invalid credentials.",
      });
    }
    const jwtToken = jwt.sign(
      {
        id: user.id,
        username: user.username,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1w" }
    );
    res.send({ message: "You are logged in", token: jwtToken, user });
  } catch (error) {}
});

module.exports = usersRouter
