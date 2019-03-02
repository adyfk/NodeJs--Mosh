const { User, validate } = require("../models/user");
const express = require("express");
const router = express.Router();
const _ = require("lodash");
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User Already registered");

  //   user = new User({
  //     name: req.body.name,
  //     email: req.body.email,
  //     password: req.body.password
  //   });

  // USing Lodash
  user = new User(_.pick(req.body, ["name", "email", "password"]));
  await user.save().catch(err => res.status("400").send("Mongo Error"));

  //   res.send({
  //     name: user.name,
  //     email: user.email
  //   });

  //USing LODASH

  res.send(_.pick(user, ["_id", "name", "email"]));
});

module.exports = router;
