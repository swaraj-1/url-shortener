const shortid = require('shortid')
const Url = require('../models/url')

// Controller to shorten URL
async function handleShortUrl(req, res) {
    const ShortID = shortid()
    const body = req.body;
    if(!body.url) return res.status(400).json({msg: "url is required"})
    await Url.create({
        shortUrl: ShortID,
        redirectURL: body.url,
        visitHistory: [],
        createdBy: req.user._id ,
    })
    //const allUrls = await Url.find({createdBy: req.user._id})
    
    return res.render('index', {id: ShortID,
        user: req.user.name,
    })

}

// Controller to redirect to original URL
async function handleRedirectUrl(req, res) {
    const shortId = req.params.shortId
    const entry = await Url.findOneAndUpdate(
        {shortUrl: shortId}, 
        {$push: {
            visitHistory: {
                ip: req.ip,
                timestamp: Date.now(),
            }
        }}, 
        {new: true})
    res.redirect(entry.redirectURL) 
}

 // Controller to get URL details
 async function handleGetUrlDetails(req, res) {
    const shortId = req.params.shortId
    await Url.findOne({shortUrl: shortId})
       .then(url => {
            if(!url) return res.status(404).json({msg: "URL not found"})
            res.json(url)
        })
       .catch(err => res.status(500).json({msg: "Error retrieving URL"}))
}

// Controller to get URL visit history
 async function handleGetVisitHistory(req, res) {
    const shortId = req.params.shortId
    await Url.findOne({shortUrl: shortId})
       .then(url => {
            if(!url) return res.status(404).json({msg: "URL not found"})
            res.json(url.visitHistory)
        })
       .catch(err => res.status(500).json({msg: "Error retrieving URL"}))
}

// Controller to get all url details
 async function handleGetAllUrlDetails(req, res) {
    await Url.find()
       .then(urls => res.json(urls))
       .catch(err => res.status(500).json({msg: "Error retrieving URLs"}))
}
 // Controller to delete URL
 async function handleDeleteUrl(req, res) {
    const shortId = req.params.shortId
    await Url.findOneAndDelete(shortId)
       .then(() => res.json({msg: "URL deleted successfully"}))
       .catch(err => res.status(500).json({msg: "Error deleting URL"}))
}


module.exports = {
    handleShortUrl,
    handleRedirectUrl,
    handleGetUrlDetails,
    handleGetVisitHistory,
    handleGetAllUrlDetails,
    handleDeleteUrl,
    // handleUpdateUrl,

 
}