const { Json } = require('sequelize/lib/utils');
const db = require('../models/index.js');
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
// object = {
//     key: '',
//     value: ''
// }
module.exports = {
    getHomePage: getHomePage,

}