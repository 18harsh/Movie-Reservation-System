const express = require('express')
const path = require('path')
const hbs = require('hbs')

const app = express()

// Define paths for Express config
const publicDirectionPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectionPath))


app.get('', (req, res) => {
    res.render('index')
})

app.get('*', (req,res) => {
    res.render('404', {
        errorMessage: 'Page not found',
    })
})

app.listen(3000,()=> {
    console.log('Server is up on port 3000.')
})