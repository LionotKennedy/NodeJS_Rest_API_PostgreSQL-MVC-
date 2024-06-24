const postgres = require("../config/database");
class UsersModel {
  // ################### FETCH DATA FROM DATABASE #################### //
  static async getUsers() {
    return new Promise((resolve, reject) => {
      postgres.query("SELECT * FROM users", "", (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  }
  // ################### ENDING #################### //

  // ################### ADD DATA INTO DATABASE #################### //
  static async addUsers(UserName, Password, Email, Image) {
    return new Promise((resolve, reject) => {
      postgres.query(
        "INSERT INTO users (UserName, Password, Email, Image) VALUES($1, $2, $3, $4)",
        [UserName, Password, Email, Image],
        (e, r) => {
          if (e) {
            console.log("error", e);
            reject(e);
          } else {
            resolve(true);
          }
        }
      );
    });
  }
  // ################### ENDING #################### //

  // ################### DELETE DATA FROM DATABASE #################### //
  static async deleteUsers(UserID) {
    return new Promise((resolve, reject) => {
      postgres.query(
        "DELETE FROM users WHERE UserID=$1",
        [UserID],
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      );
    });
  }
  // ################### ENDING #################### //

  // ################### UPDATE DATA FROM DATABASE #################### //
  static async updateUsers(UserID, UserName, Password, Email, Image) {
    return new Promise((resolve, reject) => {
      postgres.query(
        "UPDATE users SET UserName = $1, Password = $2, Email = $3, Image = $4 WHERE UserID = $5",
        [UserName, Password, Email, Image, UserID],
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      );
    });
  }
  // ################### ENDING #################### //

  // ################### EDIT DATA FROM DATABASE #################### //
  static async editUsers(UserID) {
    return new Promise((resolve, reject) => {
      postgres.query(
        "SELECT * FROM users WHERE UserID= $1",
        [UserID],
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      );
    });
  }
  // ################### ENDING #################### //
}

module.exports = UsersModel;
