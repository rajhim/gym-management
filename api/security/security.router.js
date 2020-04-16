const router = require("express").Router();
const {
  login,
} = require("./security.controller");
router.post("/login", login);


module.exports = router;
