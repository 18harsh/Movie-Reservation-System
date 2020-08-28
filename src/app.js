const express = require('express')
const path = require('path')
const hbs = require('hbs')
const bodyParser = require("body-parser")
var session = require('express-session')

require('./db/mongoose')
const User = require('./models/user')

const app = express()

// Define paths for Express config
const publicDirectionPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.use(bodyParser.urlencoded({ extended: true })); 
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectionPath))
app.use(express.json())

app.use(require("express-session")({ 
	secret: "harsh", 
	resave: false, 
	saveUninitialized: false
})); 


app.get('', (req, res) => {
    res.render('index',{
        direct: "login",
        directname: "Sign In",
        status: 'none'
    })
})

app.get('/login', (req, res) => {
    res.render('login',{
        direct: "signup",
        directname: "Sign Up"
    })
})

app.get('/signup', (req, res) => {
    
    res.render('signup',{
        direct: "login",
        directname: "Sign In",
        status: 'none'
    })
})
app.post('/signup', (req, res) => {
    const data = {
        Fname: req.body.Fname,
        Lname: req.body.Lname,
        Email: req.body.Email,
        Password: req.body.Password
    }

    const user = new User(data)
    user.save().then(() => {
        res.render('index',{
            direct: "login",
            directname: "",
            status: 'success'
        })
    }).catch((e) => {
        // res.send('<script>alert("There is some technical problem. Try again later!")</script>')
        res.render('signup',{
            direct: "login",
            directname: "Sign In",
            status: 'failed'
        })
        // res.alert("There is some technical problem. Try again later!")
    })
})

app.get('*', (req,res) => {
    res.render('404',{
        direct: "login",
        directname: "Sign In"
    })
})

app.listen(3000,()=> {
    console.log('Server is up on port 3000.')
})