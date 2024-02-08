const { response } = require("express");
const db = require("../config/database");

const UserModel = {};

UserModel.getAllUser = () => {
  return new Promise((response, reject) => {
    db.query("SELECT * FROM registration", (err, results) => {
      if (err) reject(err);
      else response(results);
    });
  });
};

UserModel.create = (data) => {
  return new Promise((response, reject) => {
    db.query(
      "INSERT INTO registration (firstName, lastName, gender, email, password, number) VALUES (?,?,?,?,?,?)",
      [
        data.firstName,
        data.lastName,
        data.gender,
        data.email,
        data.password,
        data.number,
      ],
      (err, results) => {
        if (err) reject(err);
        else response(results);
      }
    );
  });
};

UserModel.getUserById = (id) => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * from registration where id=?", [id], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

UserModel.update = (data) => {
  return new Promise((response, reject) => {
    db.query(
      "UPDATE registration SET firstName = ?,lastName=?,gender=?, email = ?,password=?,number=? WHERE id = ?",
      [
        data.firstName,
        data.lastName,
        data.gender,
        data.email,
        data.password,
        data.number,
        data.id,
      ],
      (err, results) => {
        if (err) reject(err);
        else response(results);
      }
    );
  });
};

UserModel.delete = (id) => {
  return new Promise((response, reject) => {
    db.query("DELETE FROM registration WHERE id = ?", [id], (err, results) => {
      if (err) reject(err);
      else response(results);
    });
  });
};

UserModel.login = (email) => {
  return new Promise((response, reject) => {
    db.query(
      "SELECT * from registration where email=?",
      [email],
      (err, results) => {
        if (err) reject(err);
        else response(results[0]);
      }
    );
  });
};
module.exports = UserModel;
