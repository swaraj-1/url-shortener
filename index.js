const express = require('express')
const urlRoutes = require('./routes/url')
const staticRoutes = require('./routes/static')
const userRoutes = require('./routes/user')
const cookieParser = require('cookie-parser')
const {restrictToLoggedInUserOnly, checkAuth} = require('./middleware/auth')
const {handleConnection} = require('./connection')
const URL = require('./models/url')

const app = express()
const PORT = process.env.PORT || 8001

// Middleware to parse incoming JSON requests
app.use(express.urlencoded({extended: false}))
app.use(express.json())

// Middleware to parse cookies
app.use(cookieParser())

// Middleware to authenticate users


// setting view engine to render static files like html and css

app.set('view engine', 'ejs')
// Connect to MongoDB database for storing shortened URLs and analytics data
handleConnection('mongodb://localhost:27017/short-url')

// Handle incoming URL requests

// Handle incoming POST requests to shorten URLs
app.use('/url',restrictToLoggedInUserOnly, urlRoutes)

app.use('/user', userRoutes)

// Handle static files requests
// Render the homepage with the form to shorten URLs
app.use('/', checkAuth, staticRoutes)

// Handle analytics requests
app.use('/url/analytics', urlRoutes)

// Redirect to the original URL after visiting a shortened URL
app.use('/url/:ShortId', urlRoutes)


app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`)
})