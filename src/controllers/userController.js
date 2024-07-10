const db = require('../models/index.js');
import userService from '../services/userService.js'
let handleLogin = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    if (!email || !password) {
        return res.status(500).json({
            errCode: 1,
            message: 'Missing iput parameter!'
        })
    }
    let userData = await userService.handleUserLogin(email, password);
    return res.status(200).json({
        userData
    })
}
let handleGetAllUser = async (req, res) => {

    let id = req.query.id // all or id
    let user = await userService.getAllUser(id);
    console.log(user);
    return res.status(200).json(
        {
            errCode: 0
            , errMessage: 'ok',
            user
        }
    )
}
let handleAddUser = async (req, res) => {
    let message = await userService.createNewUser(req.body);
    console.log("message createUser", message);
    return res.status(200).json(
        {
            message
        }

    )
}
let handleEditUser = async (req, res) => {
}
let handleDeleteUser = async (req, res) => {
    let message = await userService.deleteUser(req.body.id);
    console.log("message createUser", message);
    return res.status(200).json(
        {
            message,
        }
    )
}

module.exports = {
    handleLogin: handleLogin,
    handleGetAllUser: handleGetAllUser,
    handleAddUser: handleAddUser,
    handleEditUser: handleEditUser,
    handleDeleteUser: handleDeleteUser,
}