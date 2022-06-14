const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const SECRET_KEY = 'Vivaelperu';

const create = async(req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({where: {email: email}});
    if (user)
        return res 
            .status(409)
            .send({ error: '409', message: 'User already exists' })
    try {
        if (password === '') throw new Error();
        const hash = await bcrypt.hash(password, 10);
        const newUser = new User({
            ...req.body,
            password: hash,
        })
        const {id} = await newUser.save();
        const accesToken = jwt.sign({id}, SECRET_KEY);
        res.status(201).send({accesToken});

    } catch (error) {
        res.status(400).send({error, message: 'Could not create user' });
    }
}

const login = async(req, res) => {
    const {email, password} = req.body;
    try {
        const user = await User.findOne({where: {email: email}});
        const validatedPass = await bcrypt.compare(password, user.password);
        if (!validatedPass) throw new Error();
        const accessToken = jwt.sign({id: user.id}, SECRET_KEY);
        res.status(200).send({accessToken});
    } catch (error) {
        res
            .status(401)
            .send({ error: '401', message: 'Username or password is incorrect'});
    }
}

const profile = async(req, res) => {
    try {
        const {id, nickname} = req.user;
        const user = {id, nickname};
        res.status(200).send(user);
    } catch (error) {
        res.status(404).send({error, message: 'Resource not found'});
    }
}

module.exports = {create, login, profile};