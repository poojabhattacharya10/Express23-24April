const express = require('express')
const router = express.Router()


const auth = require('../middlewares/auth')

const UserController = require('../controllers/usercontroller')
const cookieParser = require('cookie-parser')

console.log(auth , 'auth');

router.use(express.urlencoded({ extended : false}))

router.use(cookieParser()) // middleware

router.get('/' , (req,res) => {
    res.render('login.ejs')
})



// auth :: middleware func
router.get('/student' , auth , (req,res) => {
    res.render('home.ejs')
})

router.get('/signup' , (req,res) => {
    res.render('signup.ejs')
})

router.post('/user/signup' , (req,res) => {
    UserController.signup(req,res)
})

router.post('/user/login' , (req,res) => {
    UserController.doLogin(req,res)
})

module.exports = router