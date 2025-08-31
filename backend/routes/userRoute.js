const router = require("express").Router();

const {myProfile,logout} = require("./../controllers/userController");
const {verifyJWT} = require('./../middleware/auth.Middleware');


router.get("/logout",logout);


router.use(verifyJWT);

router.get("/myprofile",myProfile);

module.exports = router;