const jwt = require('jsonwebtoken')

function isLoggedIn(req,res,next){
    try {
            if (req.cookies.token) {
                jwt.verify(req.cookies.token,"secret",function (err,decoded) {
                    if (decoded) {
                        req.user = decoded;
                        next();
                    }
                    else{
                        res.cookie("token","")
                        res.redirect('/')
                    }
                })
            }
            else{
                res.redirect("/login");
            }
        
    } catch (error) {
        res.send(error.message)
    }
}

function redirectIfLogin(req, res, next) {
    if (req.cookies.token) {
      res.redirect("/");
    } else next();
}
  
  module.exports.isLoggedIn = isLoggedIn;
  module.exports.redirectIfLogin = redirectIfLogin;