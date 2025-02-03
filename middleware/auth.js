const{getUser} = require('../service/auth')


async function restrictToLoggedInUserOnly(req, res, next){
   const uuId = req.cookies?.session;
    if (!uuId) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
    const user = await getUser(uuId)
    if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
    req.user = user;
    next();
}

async function checkAuth(req, res, next){
    const uuId = req.cookies?.session;

    const user = getUser(uuId)

    req.user = user;
    next();

}

module.exports = {
    restrictToLoggedInUserOnly,
    checkAuth,
 
};