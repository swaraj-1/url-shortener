const express = require('express')
const URL = require('../models/url')
const USER = require('../models/users')

const {restrictTo, checkAuth} = require('../middleware/auth')

const router = express.Router()


// Define a route for the homepage

router.get('/',restrictTo(["ADMIN","NORMAL"]), async(req, res) => {
    if(!req.user) return res.redirect('/login')
    const allUrls = await URL.find({createdBy: req.user._id})

    res.render('index', {
        urls: allUrls,
        user: req.user.name,

    })
})

router.get('/admin', restrictTo(["ADMIN"]), async(req, res)=>{
    if(!req.user) return res.redirect('/login')
        const allUrls = await URL.find({})
    
        res.render('index', {
            urls: allUrls,
            user: req.user.name,
    
        })
})

router.get('/signup', (req, res)=>{
    res.render('signup')
})

router.get('/login', (req, res)=>{
    res.render('login')
})



module.exports = router;