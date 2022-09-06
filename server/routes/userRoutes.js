import express from 'express';
import passport from 'passport';
// import isAuth from '../middleware/auth-middleware.js';
import dotenv from 'dotenv';
dotenv.config({ path: "./routes/.env" });
import UserController from "../controllers/userController.js";
const router = express.Router();



// function isLoggedIn(req, res, next) {
//     if (req.isAuthenticated()) {
//         return next();
//     }
//     res.redirect(CLIENT_URL);
// }



router.get("/loginSuccess", (req, res) => {
    if (req.user) {
        // console.log(req.session.id);
        req.session.isAuth = true;
        res.status(200).json({
            user: req.user,
            message: "Login Successful",
            // redirect: CLIENT_URL,
        });
    } else {
        res.status(401).json({
            message: "Login Failed",
        });
    }
}
);



router.post("/register", UserController.userRegister);
router.post("/login", UserController.userLogin);
router.get("/logout", UserController.userLogout);
router.get("/getUser/:id", UserController.userGet);
router.put("/updateUser", UserController.userUpdate);
router.delete("/deleteUser/:id", UserController.userDelete);







//Social Auth///////////////////////////////////////////


//google auth
router.get("/auth/google", passport.authenticate('google', { scope: ['profile', 'email'] }));
// router.get("/auth/google/callback", passport.authenticate('google'));
router.get("/auth/google/callback", passport.authenticate('google', { failureRedirect: process.env.CLIENT_URL + "loginFailed" }), (req, res) => {
    console.log(req.user);
    // res.redirect(CLIENT_URL + "dashboard");
    res.status(200).json({ message: "User logged in successfully", token: req.user.token, firstName: req.user.firstName, lastName: req.user.lastName, email: req.user.email });
}
);      


//github auth
router.get('/auth/github',passport.authenticate('github', { scope: [ 'profile' ] }));
router.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: process.env.CLIENT_URL + "loginFailed" }), (req, res) => {
    console.log(req.user);
    // res.redirect(CLIENT_URL + "dashboard");
    res.status(200).json({ message: "User logged in successfully", token: req.user.token, email: req.user.email });
}
);

//facebook auth
router.get("/auth/facebook", passport.authenticate('facebook', { scope: ['public_profile'] }));
router.get("/auth/facebook/callback", passport.authenticate('facebook', { successRedirect: process.env.CLIENT_URL + "dashboard" }));



export default router;