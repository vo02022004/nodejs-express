import { where } from 'sequelize'
import db from '../models/index'
import bcrypt from 'bcryptjs'
import { raw } from 'body-parser';

const salt = bcrypt.genSaltSync(10);


let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};

            let isExist = await CheckUserEmail(email)
            if (isExist) {
                // compare password
                let user = await db.User.findOne(
                    {
                        where: {
                            email: email,
                        },
                        attributes: ['email', 'roleId', 'password'],
                        raw: true
                    }
                )
                if (user) {

                    let check = await bcrypt.compareSync(password, user.password);
                    if (check) {
                        userData.errCode = 0;
                        // userData.errMessage = `ok`;
                        delete user.password
                        userData.user = user;

                    }
                    else {
                        userData.errCode = 3;
                        userData.errMessage = `wrong password`;
                    }
                }
                else {
                    userData.errCode = 1;
                    userData.errMessage = `user's not found!`
                }
            }
            else {
                userData.errCode = 1;
                userData.errMessage = `your's email isn't in your system. please  try other email !`
            }
            resolve(userData)
        } catch (e) {
            reject(e);
        }
    });

}
let CheckUserEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne(
                {
                    where: { email: userEmail }
                }
            )
            if (user) {
                resolve(true);

            }
            else {
                resolve(false);
            }
        }
        catch (e) {
            reject(e);
        }
    })
}
let getAllUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = '';
            if (userId === 'All') {
                user = await db.User.findAll({
                    attributes: {
                        exclude: ['password']
                    }
                });
            }
            if (userId && userId !== 'All') {
                user = await db.User.findOne({
                    where: {
                        id: userId
                    },
                    attributes: {
                        exclude: ['password']
                    }
                });
            }

            resolve(user)
        }
        catch (e) {
            reject(e);
        }
    })
}
let createNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let check = await CheckUserEmail(data.email);
            if (check === true) {
                resolve(
                    {
                        errCode: 1,
                        message: "your email is already in used, plz try another email!"
                    }
                )
            }
            else {
                let hashPasswordFromBcrypt = await hashUserPassword(data.password);
                await db.User.create({
                    email: data.email,
                    password: hashPasswordFromBcrypt,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    address: data.address,
                    phoneNumber: data.phonenumber,
                    gender: data.gender === "1" ? true : false,
                    image: '',
                    roleId: data.roleId,
                    positionId: data.positionId,
                })

            }
            resolve(
                {
                    errCode: 0,
                    message: "oke "
                }
            );

        } catch (e) {
            reject(e);
        }
    })
}
let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            var hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        }
        catch (e) {
            reject(e);
        }
    });
}
let deleteUser = (userId) => {
    console.log("chck id user", userId);
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne(
                {
                    where: {
                        id: userId
                    },
                    raw: true
                }
            )
            console.log(user);
            if (!user) {
                resolve({
                    errCode: 1,
                    errMessage: "User not found!"
                })
            }
            else {
                await db.User.destroy({
                    where: {
                        id: userId,
                    },
                });
                resolve({
                    errCode: 0,
                    errMessage: "oke !"
                })
            }
        }
        catch (e) {
            reject(e);
        }
    })
}
module.exports = {
    handleUserLogin: handleUserLogin,
    getAllUser: getAllUser,
    createNewUser: createNewUser,
    deleteUser: deleteUser,
}