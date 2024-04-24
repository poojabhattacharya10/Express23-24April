const express = require('express')
const app = express()

const path = require('path')

const user = require('./routes/user')

const connect = require('./connection')
connect()

// middleware :: functions that terminate or execute the req , (simple funcs) , can use more than 1 middleware
// app.use((req,res,next)=>{
//     console.log('Hello from middleware ... ');

//     next()
// } )


// app.get('/' , (req,res)=> {
//     res.end('<h1> Hello from server... </h1>')
// })


app.use(user)

app.set('view engine' , 'ejs')
app.set('views' , path.resolve('./views'))



app.listen(3000 , (err) => {
    if(err) {
        console.log(err);
    }
    else{
        console.log('Server is running at port no. 3000');
    }
})











































