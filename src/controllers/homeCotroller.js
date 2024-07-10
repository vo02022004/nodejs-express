const { Json } = require('sequelize/lib/utils');
const db = require('../models/index.js');
import CRUDservice from '../services/CRUDservice.js';
let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll();
        // console.log(data);   
        return res.render('homePage.ejs', {

            data: JSON.stringify(data)
        }
        );
    }
    catch (e) {
        console.log(e);
    }
}
let AddUser = async (req, res) => {
    return res.render('createUser.ejs');
}
let handleAddUser = async (req, res) => {
    let message = await CRUDservice.createNewUser(req.body);
    console.log(message);
    return res.redirect('/user')

}
let dislayGetCRUDUser = async (req, res) => {
    try {
        let data = await CRUDservice.getAllUser();

        return res.render('dislayCRUD.ejs', {

            data: data
        }
        );
    }
    catch (e) {
        console.log(e);
    }

}
let editCRUDUser = async (req, res) => {
    let id = req.query.id;
    if (id) {

        let userData = await CRUDservice.getUserinfor(id);
        // console.log(userData);
        return res.render('editCRUD.ejs', {
            data: userData
        })
    }
    else {
        console.log("underfied");
    }
    console.log(userData);
}
let putCRUDUser = async (req, res) => {
    let data = req.body;
    // console.log('check id edit', data);
    let allUser = await CRUDservice.updateUser(data)
    // console.log("check user edit jsghxjgshjjg");
    // console.log(data);
    // Nếu cập nhật thành công, chuyển hướng về trang hiển thị
    return res.render('dislayCRUD.ejs', {
        data: allUser
    }
    );    // let userData = await CRUDservice.getUserinfor(id); 
}
// object = {
let deleteUser = async (req, res) => {
    console.log('check id hanleDeleteUser');
    console.log(req.query.id);
    let id = req.query.id
    let allUser = await CRUDservice.handleDeleteUser(id)

    return res.render('dislayCRUD.ejs', {

        data: allUser,
    });
}
//     key: '',
//     value: ''
// }
module.exports = {
    getHomePage: getHomePage,
    AddUser: AddUser,
    handleAddUser: handleAddUser,
    dislayGetCRUDUser: dislayGetCRUDUser,
    editCRUDUser: editCRUDUser,
    putCRUDUser: putCRUDUser,
    deleteUser: deleteUser,

}