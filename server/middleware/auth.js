const jwt = require('jsonwebtoken');
const User = require('../models/user');
const SECRET_KEY = 'Vivaelperu';

const authMiddleware = async(req, res, next) => {
    const authHeaders = req.headers['authorization'];
    if (!authHeaders) return res.sendStatus(403);
    const token = authHeaders.split(' ')[1];

    try {
        const {id} = jwt.verify(token, SECRET_KEY);
        const user = await User.findOne({where: {id}})
        if (!user) return res.sendStatus(401);
        req.user = user;
        next();

    } catch (error) {
        res.sendStatus(401);
    }
}

module.exports = authMiddleware;