import bcrypt from 'bcryptjs';
import db from '../models/index'
const salt = bcrypt.genSaltSync(10);

let createNewUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {

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
            resolve();
        }
        catch (e) {
            reject(e);
        }
    })

}
let getAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let User = await db.User.findAll({
                raw: true,
            })
            resolve(User);
        } catch (e) {
            reject(e);
        }
    })
}
let getUserinfor = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let User = await db.User.findOne({ where: { id: userId }, raw: true });
            if (User) {

                resolve(User);
            }
            resolve([]);
        } catch (e) {
            reject(e);
        }
    })
}
let updateUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPasswordFromBcrypt = await hashUserPassword(data.password);
            let user = await db.User.findOne({ where: { id: data.id } });
            if (user) {
                user.email = data.email;
                user.password = hashPasswordFromBcrypt;
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address;
                user.phoneNumber = data.phoneNumber
                await user.save();
                let allUser = await db.User.findAll();
                resolve(allUser);

            }
            else {
                resolve();

            }
        } catch (e) {
            reject(e);
        }
    });

}
let handleDeleteUser = (id) => {
    return new Promise(async (resovle, rejest) => {
        try {
            await db.User.destroy({
                where: {
                    id: id,
                },
            });
            let allUser = await db.User.findAll({ raw: true });
            resovle(allUser);
        } catch (e) {
            rejest(e);
        }
    });
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
module.exports = {
    createNewUser: createNewUser,
    getAllUser: getAllUser,
    getUserinfor: getUserinfor,
    updateUser: updateUser,
    handleDeleteUser: handleDeleteUser,
}