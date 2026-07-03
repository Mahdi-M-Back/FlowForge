const express = require("express");

const router = express.Router();

const userRoute = require('./modules/user/router/user.route')


router.use('/users',userRoute)


module.exports = router;