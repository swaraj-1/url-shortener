const express = require('express')
const {handleShortUrl, 
     handleGetAllUrlDetails, 
     handleRedirectUrl,
     handleDeleteUrl, 
     handleGetUrlDetails} = require('../controllers/url')
const router = express.Router()

// Require routes
router.post('/', handleShortUrl)

router.get('/analytics',handleGetAllUrlDetails)

router.get('/:shortId', handleRedirectUrl)

router.delete('/:shortId', handleDeleteUrl)

router.get('/details/:shortId', handleGetUrlDetails)


module.exports = router;
