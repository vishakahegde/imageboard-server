const { Router } = require("express");
const User = require("../models/").user;

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

module.exports = router;
