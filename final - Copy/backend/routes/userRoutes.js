
const express = require('express')
const router = express.Router()

//imported model
const user = require('../model/userModel.js');

//imported controller
const userController = require('../controllers/userController.js')

// getting users
router.get("/", userController.getAllUsers)

//getting users by id
router.get("/:id", userController.getById)

//inserting users
router.post("/adduser", userController.addUsers)

//updating user
router.put("/:id", userController.updateUser)

//delete user
router.delete("/:id", userController.deleteUser)

//exports
module.exports = router;


module.exports = router;
