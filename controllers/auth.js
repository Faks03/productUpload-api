require('dotenv').config();
const User = require('../models/User')
const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');
const BadRequestError = require('../errors/bad-request');
const UnauthenticatedError = require('../errors/unauthenticated');


const register = async (req, res) => {
    const user = await User.create({ ...req.body })
    const token = user.createJWT();
    // res.status(StatusCodes.CREATED).json({ user: {name:user.name}, token });
    setTimeout(() => {
        res.redirect('/index.html');
      }, 2000);
}

const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new BadRequestError('Please provide email and password');
    }

    const user = await User.findOne({ email });
    // if the user does not exist
    if (!user) {
        throw new UnauthenticatedError('Invalid Credentials');
    }

    const is = await user.matchPasswords(password);
    if (!is) {
        throw new UnauthenticatedError('Invalid Credentials');
    }

    const token = user.createJWT();    
    
    res.status(StatusCodes.OK).json({ user: {name:user.name}, token });
    // setTimeout(() => {
    //     res.redirect('/product.html');
    //   }, 2000);


}

module.exports = {
    register,
    login,
}