// /Users/harsh/mongodb/bin/mongod.exe --dbpath=/Users/harsh/mongodb-data
const express = require('express')
require('./db/mongoose')
const path = require('path')
const http = require('http')
const hbs = require('hbs')
const socketio = require('socket.io')
const bodyParser = require("body-parser")
var expressSession = require('express-session');


// Image
// const multer = require('multer')
// const upload = multer({
//     dest: 'images'
// })


// Routers
const userRouter = require('./routers/user')
const bid = require('./routers/bid')

// Models
const User = require('./models/user')
const Movies = require('./models/movies')

// App
const app = express()
app.use(express.json())
const port = process.env.PORT

// create server
const server = http.createServer(app)
const io = socketio(server)


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
app.use(userRouter);
app.use(bid);



// 

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
    res.render('faq', {
        userdata: req.session.user,
        loginsuccess: req.session.successlogin,
        loginpage: req.session.loginpage,
        error: req.session.error
    })
})

app.get('/movies', async (req, res) => {
    req.session.loginpage = false
    let movies 
    const filter = Object.keys(req.query)
    if (Object.keys(req.query)[0] === "search") {
        movies = await Movies.find({ movieName: Object.values(req.query) })
    }else{
        
        if (filter.length <1) {
            movies = await Movies.find({})
        } else {
            movies = await Movies.find({ genre: filter })
            language = await Movies.find({ language: filter })
            if (language.length > 0) {
                movies = [...language]
            }
        }
    }
    
    res.render('movies', {
        userdata: req.session.user,
        loginsuccess: req.session.successlogin,
        loginpage: req.session.loginpage,
        error: req.session.error,
        movies,
        filter
    })
})

app.get('/movies/seats', async (req, res) => {
    res.render('seats', {
        userdata: req.session.user,
        loginsuccess: req.session.successlogin,
        loginpage: req.session.loginpage,
        error: req.session.error
    })
})


// console.log(req.session.movieName);
app.get('/movies/*', async (req, res) => {
    try {
        res.render('timing', {
            
        })
    } catch (e) {
        res.status(400).send(e)
    }
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


app.get('/help', (req, res) => {
    res.render('help',{
        
    })
})

app.get('*', (req,res) => {
    res.render('404',{
      
    })
})


// app.listen(port,()=> {
//     console.log('Server is up on port '+port+'.')
// })


let count = 0
io.on('connection', (socket)=>{
    console.log('New WebSocket connection')

    socket.emit('countUpdated',count)
})

server.listen(port, () => {
    console.log(`Server is up on port ${port}!`)
})
