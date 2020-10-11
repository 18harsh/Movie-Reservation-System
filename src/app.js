// /Users/harsh/mongodb/bin/mongod.exe --dbpath=/Users/harsh/mongodb-data
const express = require('express')
require('./db/mongoose')
const path = require('path')
const hbs = require('hbs')
const bodyParser = require("body-parser")
var expressSession = require('express-session');
// Image
// const multer = require('multer')
// const upload = multer({
//     dest: 'images'
// })


// Routers
const userRouter = require('./routers/user')

// Models
const User = require('./models/user')
const Movies = require('./models/movies')

// App
const app = express()
app.use(express.json())
const port = process.env.PORT

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


// express session
app.use(expressSession({secret: 'max', saveUninitialized: false, resave: false}));

// Router connection
app.use(userRouter)

app.get('/', async (req, res) => {
    req.session.loginpage = false
    const movies = await Movies.find({}).limit(4)
    res.render('index', {
        userdata: req.session.user,
        loginsuccess: req.session.successlogin,
        loginpage: req.session.loginpage,
        error: req.session.error,
        movies
    })
})

app.get('/offer', (req, res) => {
    res.render('offer',{
        loginsuccess: req.session.successlogin,
        loginpage: req.session.loginpage,
        error: req.session.error
    })
})

app.get('/faq', (req, res) => {
    res.render('faq',{
        loginsuccess: req.session.successlogin,
        loginpage: req.session.loginpage,
        error: req.session.error
    })
})

app.get('/movies', async (req, res) => {
    const filter = Object.keys(req.query)
    req.session.loginpage = false
    let movies 
    if (filter.length <1) {
        movies = await Movies.find({})
    } else {
        movies = await Movies.find({ genre: filter })
        language = await Movies.find({ language: filter })
        if (language.length > 0) {
            movies = [...language]
        }
    }
    
    res.render('movies', {
        loginsuccess: req.session.successlogin,
        loginpage: req.session.loginpage,
        error: req.session.error,
        movies,
        filter
    })
})

// app.post('/movies', async (req, res) => {
//     const movies = new Movies(req.body)
//     try {
//         await movies.save()
//         res.status(201).send({ movies })
//     } catch (e) {
//         res.status(400).send(e)
//     }
// })

// app.post('/upload', upload.single('upload'), (req, res) => {
//     res.send()
// })

app.get('*', (req,res) => {
    res.render('404',{
      
    })
})

app.listen(port,()=> {
    console.log('Server is up on port '+port+'.')
})