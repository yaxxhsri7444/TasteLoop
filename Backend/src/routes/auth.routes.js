const express = require('express');
const authcontroller = require("../controllers/auth.controller");

const router = express.Router();

router.post('/register', authcontroller.registerUser);
router.post('/login',authcontroller.loginUser);
router.post('/logout',authcontroller.logoutUser);

router.post('/partner/register', authcontroller.registerfoodPartner);
router.post('/partner/login',authcontroller.loginfoodPartner);
router.post('/partner/logout',authcontroller.logoutfoodPartner);


module.exports = router;