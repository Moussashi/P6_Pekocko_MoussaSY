const jwt = require('jsonwebtoken');

const auth= (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    if(!token) return res.status(401).send('Access Denied')
    try {
        /*jwt.verify needs the token and as a 2nd arg the secret
        if verified it will send back the user ID */
        const verified = jwt.verify(token, process.env.TOKEN_SECRET)
        req.user = verified
        next();
    } catch (error) {
        res.status(400).send('Invalid Token');
    }
};

module.exports = auth;

// RAS