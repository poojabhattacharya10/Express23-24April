const User =  require('../models/User')

const jwt = require('jsonwebtoken')

const bcrypt = require('bcrypt')
const saltRounds = 10 // no.of times hashing process to be done

const signup = async (req,res) => {
    try {
        console.log(req.body);
        let userExists = await User.findOne({ email : req.body.email })
        // email :: db saved email
        // req.body.email :: form email
        if(userExists) return res.end('<h1> User already exists ...  </h1>')
        let user = new User(req.body);
        user.password = bcrypt.hashSync(req.body.password , saltRounds); // now encrypted password is in db and also it is assign to user.password
        user = await user.save();
        res.end('<h1> User has been successfully created </h1>')
    } catch (error) {
        console.log(error);
    }
}


const doLogin = async (req,res) => {
    try {
        console.log(req.body);
        let user = await User.findOne({ email : req.body.email})
        if(! user) return res.end('<h1> No user found ... </h1>')
        console.log(user);
        let flag = bcrypt.compareSync(req.body.password , user.password)
        // req.body.password :: filled by user
        // user.password :: db encrypted password
        if(flag){
            let token = jwt.sign( {id : user._id} , 'secret' , {expiresIn : 60 * 60})
            console.log(token , 'token');
            // 3 parameter :: payload , secret key , expiresIn
            // 'secret' :: secret key
            // id : user._id :: payload  , if many pass then payload(no. of attributes) heavy
            res.cookie('jwt' , token)
            // key :: 'jwt'
            // token :: jsonwebtoken generates token based on payload
            // cookie :: key value
            res.end('<h1> Login Successfull !!</h1>')
        }
        else{
            res.end('<h1> In Correct username or password !! </h1>')
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    signup,
    doLogin
}