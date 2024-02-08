const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const UserController = require("../models/userModel");
const { sign } = require("jsonwebtoken");

const getAllUser = async (req, res) => {
  try {
    const results = await UserController.getAllUser();
    if (!results.length > 0) throw new Error("No user found!!!");
    return res
      .status(201)
      .json({ message: "Successfully fetched all users", data: results });
  } catch (error) {
    console.log(`Error in getting all users : ${error}`);
    return res
      .status(400)
      .json({ errorMessage: `Error in getting all users : ${error}` });
  }
};

const createUser = async (req, res) => {
  try {
    const body = req.body;
    const salt = genSaltSync;
    body.password = hashSync(body.password, parseInt(salt));
    const result = await UserController.create(body);
    return res.status(200).json({
      success: 1,
      message: "User created successfully",
      data: result,
    });
  } catch (error) {
    console.log(`Error in creating a user : ${error}`);
    return res.status(500).json({ success: 0, errorMessage: `${error}` });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await UserController.getUserById(id);
    if (result.length === 0) {
      return res
        .status(404)
        .json({ success: 0, errorMessage: "User not found" });
    }
  } catch (error) {
    console.log(`Error in getting user by ID : ${error}`);
    return res.status(500).json({ success: 0, errorMessage: `${error}` });
  }
};

const updateUser = async (req, res) => {
  try {
    const body = req.body;
    const result = await UserController.update(body);
    return res
      .status(200)
      .json({ success: 1, message: "Updated successfully" });
  } catch (err) {
    console.log(`Error in getting user by ID : ${err}`);
    return res.status(500).json({ success: 0, errorMessage: `${err}` });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.body;
    const result = await UserController.delete(id);
    return res
      .status(200)
      .json({ success: 1, message: "User deleted successfully" });
  } catch (err) {
    console.log(`Error in getting user by ID : ${err}`);
    return res.status(500).json({ success: 0, errorMessage: `${err}` });
  }
};

const loginUser = async (req, res) => {
  try {
    const body = req.body;
    const results = await UserController.login(body.email);
    if (!results) {
      return res.status(403).json({
        success: 0,
        data: "Invalid email or password",
      });
    }
    const result = compareSync(body.password, results.password);
    if (result) {
      results.password = undefined;
      const jsontoken = sign({ result: results }, process.env.SECRET_KEY, {
        expiresIn: "1h",
      });
      return res.json({
        success: 1,
        message: "Login successfully",
        token: jsontoken,
      });
    } else {
      return res.json({
        success: 0,
        data: "Invalid email or password",
      });
    }
  } catch (err) {
    console.log(`Error in getting user by ID : ${err}`);
    return res.status(500).json({ success: 0, errorMessage: `${err}` });
  }
};

module.exports = {
  getAllUser,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  loginUser,
};
