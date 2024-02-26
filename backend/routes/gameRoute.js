const router = require("express").Router();
const {
    login,
    signup,
    verifyUser
} = require("../controllers/userController");
const verifyLogin = require("../utils/verify")

router.post('/login', login);
router.post('/signup', signup);
router.get('/', verifyLogin, verifyUser)

module.exports = router