const express = require("express");
const router = express.Router();
const db = require("../config/database");
const UserRouter = require("../controllers/userController");
const { checkToken } = require("../auth/token_validation");
//get all users
router.get("/api/users", checkToken, UserRouter.getAllUser);

router.post("/api/users", checkToken, UserRouter.createUser);
router.get("/api/:id", checkToken, UserRouter.getUserById);
router.put("/api/users", checkToken, UserRouter.updateUser);
router.delete("/api/users", checkToken, UserRouter.deleteUser);
router.post("/api/users/login", UserRouter.loginUser);
module.exports = router;
