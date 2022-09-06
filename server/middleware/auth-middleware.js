//middleware


const isAuth = (req, res, next) => {
    console.log(req.session.isAuth);
    if (req.session.isAuth) {
        next();
    }
    else {
        res.redirect("http://localhost:3000");
    }
}


export default isAuth;