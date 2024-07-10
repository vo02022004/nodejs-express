import express from 'express';
import homeCotroller from '../controllers/homeCotroller';
import userController from '../controllers/userController';
let router = express.Router();
let initWebRouter = (app) => {
    router.get('/', homeCotroller.getHomePage);
    router.get('/create-user', homeCotroller.AddUser);
    router.post('/post-crud', homeCotroller.handleAddUser);
    router.get('/user', homeCotroller.dislayGetCRUDUser);
    router.get('/edit-user', homeCotroller.editCRUDUser);
    router.post('/put-crud', homeCotroller.putCRUDUser);
    router.get('/delete-crud', homeCotroller.deleteUser);


    // ****************************************
    router.post('/api/login', userController.handleLogin);
    router.get('/api/get-all-user', userController.handleGetAllUser);
    router.post('/api/create-user', userController.handleAddUser);
    router.put('/api/edit-user', userController.handleEditUser);
    router.delete('/api/delete-user', userController.handleDeleteUser);


    return app.use("/", router);
}
module.exports = initWebRouter;