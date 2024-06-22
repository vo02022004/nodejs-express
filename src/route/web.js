import express from 'express';
import homeCotroller from '../controllers/homeCotroller';
let router = express.Router();
let initWebRouter = (app) => {
    router.get('/', homeCotroller.getHomePage);
    router.get('/home', (req, res) => {
        return res.send("hello word  with vo tu");
    })
    return app.use("/", router);
}
module.exports = initWebRouter;