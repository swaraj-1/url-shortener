const{getUser} = require('../service/auth')


function checkForAuthentication(req, res, next){
    const tokenCookie = req.cookies?.session;
    req.user = null;
    if (!tokenCookie) {
        return next();
    }
    const token = tokenCookie
    const user = getUser(token)
    req.user = user;
    next();
}



function restrictTo(roles=[]){
    return async (req, res, next) => {
        const user = req.user;
        if (!user) {
            return res.redirect('/login');
        }
        if (!roles.includes(user.role)) {
            return res.status(403).json({ message: 'Access denied' });
        }
                
        next();
    };
   
}
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
    restrictTo,
    checkForAuthentication,
 
};