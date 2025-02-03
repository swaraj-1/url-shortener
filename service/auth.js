const jwt = require('jsonwebtoken')

const SECRET_KEY = 'swaraj@2298'

function setUser(user) {
    const payload = {
        _id: user._id,
        name: user.name,
        email: user.email,
    }
return jwt.sign(payload, SECRET_KEY)
    
}

function getUser(token) {
    if (!token) return null
    return jwt.verify(token, SECRET_KEY)
}

module.exports = {
    setUser,
    getUser
}

