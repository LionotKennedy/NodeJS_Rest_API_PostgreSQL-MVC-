const express = require("express");
const userControllers = require("../controllers/UserControllers");
const { check } = require("express-validator");
const { upload } = require("../config/multer"); // Import upload as an object

const route = express.Router();

route.get("/", (req, res, next) => {
  res.send("Project REST FULL API using NodeJS, ExpressJS and PostgreSQL");
});

route.get("/alluser", userControllers.getallUser);

route.post("/adduser", upload.single("Image"), userControllers.addNewUser);

route.delete(
  "/deleteuser",
  [
    check("UserID")
      .exists()
      .withMessage("UserID is required")
      .isNumeric()
      .withMessage("ID should be only number"),
  ],
  userControllers.deleteUser
);

route.put("/updateuser", upload.single("Image"), userControllers.updateUser); // Include upload middleware

route.get("/edituser", userControllers.editUser);

module.exports = route;
