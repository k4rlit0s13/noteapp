import express from 'express';
import userRouter from '../routes/userrouter.js';

const apiV1 = express.Router();
apiV1.use('/users', userRouter);

export default apiV1;
