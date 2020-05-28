const { Router } = require("express");
const User = require("../models/").user;
const bcrypt = require("bcrypt");

const router = new Router();

async function getUsers() {
  try {
    const allUsers = await User.findAll();
    console.log("Users", allUsers);
    return allUsers.map((user) => user.get({ plain: true }));
  } catch (e) {
    console.error(e);
  }
}

router.get("/", async (req, res, next) => {
  res.send(getUsers());
});

router.post("/", async (req, res, next) => {
  try {
    const { email, password, fullName } = req.body;
    console.log("Data:", email, password, fullName);
    console.log("request:", req.body);

    if (!email || !password || !fullName) {
      res.status(400).send("missing parameters");
    } else {
      const hashedPassword = bcrypt.hashSync(password, 10);
      const newUser = await User.create({
        email,
        password: hashedPassword,
        fullName,
      });
      res.json(newUser);
    }
  } catch (e) {
    next(e);
  }
});

module.exports = router;
