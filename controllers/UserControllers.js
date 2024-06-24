const userModel = require("../models/User");
const { validationResult } = require("express-validator");
const fs = require("fs");
const path = require("path");

class UserControllers {
  // ################### FETCH DATA FROM DATABASE #################### //
  static async getallUser(req, res) {
    try {
      const results = await userModel.getUsers();
      res.json({
        status: 200,
        rowCount: results.rowCount,
        message: "Fetched all data successfully...",
        data: results.rows,
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: "Failed to fetch users...",
      });
    }
  }
  // ################### ENDING #################### //

  // ################### ADD DATA INTO DATABASE #################### //
  static async addNewUser(req, res) {
    const { UserName, Password, Email } = req.body;
    const Image = req.file ? req.file.filename : null;

    // console.log(
    //   `SQL in Model Values: UserName=${UserName}, Password=${Password}, Email=${Email}`
    // );

    if (!UserName || !Password || !Email) {
      return res.status(400).json({
        status: 400,
        message: "All fields are required...",
      });
    }

    try {
      const response = await userModel.addUsers(
        UserName,
        Password,
        Email,
        Image
      );
      if (response === true) {
        res.json({
          status: 200,
          message: "Added successfully...",
        });
      } else {
        res.status(500).json({
          status: 500,
          message: "Add failed...",
        });
      }
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: "Add failed...",
      });
    }
  }
  // ################### ENDING #################### //

  // ################### DELETE DATA FROM DATABASE #################### //
  static async deleteUser(req, res) {
    const UserID = req.body.UserID;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    try {
      // Fetch the user to get the image filename
      const user = await userModel.editUsers(UserID);
      if (user.rowCount === 0) {
        return res.status(404).json({
          status: 404,
          message: "User not found...",
        });
      }
      const image = user.rows[0].image;

      // Delete the user
      const resultats = await userModel.deleteUsers(UserID);
      if (resultats.rowCount > 0) {
        // Delete the image file if it exists
        if (image) {
          fs.unlink(path.join(__dirname, "../uploads", image), (err) => {
            if (err) console.log("Failed to delete image file: ", err);
          });
        }
        res.json({
          status: 200,
          resultats: resultats.rowCount,
          message: "Deleted successfully...",
        });
      } else {
        res.status(404).json({
          status: 404,
          resultats: resultats.rowCount,
          message: "Failed to delete user...",
        });
      }
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: "Failed to delete user...",
      });
    }
  }
  // ################### ENDING #################### //

  // ################### UPDATE DATA FROM DATABASE #################### //
  static async updateUser(req, res) {
    const { UserID, UserName, Password, Email } = req.body;
    const newImage = req.file ? req.file.filename : null;

    try {
      // Fetch the current user to get the current image filename
      const user = await userModel.editUsers(UserID);
      if (user.rowCount === 0) {
        return res.status(404).json({
          status: 404,
          message: "User not found...",
        });
      }
      const currentImage = user.rows[0].image;

      // Update the user
      const response = await userModel.updateUsers(
        UserID,
        UserName,
        Password,
        Email,
        newImage
      );
      if (response.rowCount > 0) {
        // Delete the old image file if it exists and a new image is uploaded
        if (newImage && currentImage) {
          fs.unlink(path.join(__dirname, "../uploads", currentImage), (err) => {
            if (err) console.log("Failed to delete old image file: ", err);
          });
        }
        res.json({
          status: 200,
          message: "Data updated successfully...",
        });
      } else {
        res.status(404).json({
          status: 404,
          message: "Failed to update user...",
        });
      }
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: "Failed to update user...",
      });
    }
  }
  // ################### ENDING #################### //

  // ################### EDIT DATA FROM DATABASE #################### //
  static async editUser(req, res) {
    const UserID = req.body.UserID;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    try {
      const resultats = await userModel.editUsers(UserID);
      if (resultats.rowCount > 0) {
        res.json({
          status: 200,
          resultats: resultats.rowCount,
          message: "Data fetched...",
          data: resultats.rows,
        });
      } else {
        res.status(404).json({
          status: 404,
          resultats: resultats.rowCount,
          message: "Failed to fetch user...",
        });
      }
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: "Failed to fetch user...",
      });
    }
  }
  // ################### ENDING #################### //
}

module.exports = UserControllers;
