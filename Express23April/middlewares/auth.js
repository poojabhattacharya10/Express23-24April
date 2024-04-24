const jwt = require('jsonwebtoken')
const requireAuth = (req,res,next) => {
    console.log(req , 'req');
    const token = req.cookies.jwt;
    console.log(token);
    // verify :: returns callback with 2 params :: err, result
    if(token){
        jwt.verify(token , 'secret' , (error , result) => {
            if(error){
                console.log('not verified ... ');
                res.render('login.ejs')
            }
            else{
                next();
            }
        }) 
    }
    else{
        res.render('login.ejs')
    }
    
}

// module.exports = {
//     requireAuth
// }

module.exports = requireAuth ;