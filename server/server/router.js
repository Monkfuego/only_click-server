const router = require("express").Router();
var {getUser , createUser} = require("./controllers/UserRoute");

router.get("/", (req, res) => {
  res.send("Let's build a CRUD API!");
});


router.get("/Users", getUser);
router.post("/createUsers", createUser);


module.exports = router;
