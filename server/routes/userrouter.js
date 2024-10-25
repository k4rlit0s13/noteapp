import express from 'express';
import UserController from '../controllers/usercontroller.js';

const userRouter = express.Router();
userRouter.post('/createuser', UserController.createUser);

export default userRouter;
