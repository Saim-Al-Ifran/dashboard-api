
const jwt = require('jsonwebtoken');

const ensureAuthenticated = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    console.log(authHeader);
    if (!authHeader) {
        return res.status(403)
            .json({ message: "Unauthoruized" });
    }
    try {
        //check valid jwt token
        const decoded = jwt.verify(authHeader, process.env.JWT_SECRET);
        req.userInfo = decoded;
        console.log(decoded);
        if (!decoded) {
            return res.status(403)
                .json({ message: "token is not correct or expired" });
        }
        next()
    } catch (err) {
        return res.status(403)
            .json({ message: "token is not correct or expired" });
    }
}

module.exports = ensureAuthenticated;