const express = require('express');

const userRouter = require('./modules/user/router/user.route');

const router = express.Router();

router.use('/users', userRouter);

module.exports = router;