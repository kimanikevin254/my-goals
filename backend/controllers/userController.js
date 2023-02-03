const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

// desc     Register a user
// @route   POST /api/users
// access   Public
const registerUser = asyncHandler( async (req, res) => {
    const { name, email, password } = req.body

    if(!name || !email || !password){
        res.status(400)
        throw new Error('Please add the required fields')
    }

    // check if user exists
    const userExists = await User.findOne({email})

    if(userExists){
        res.status(400)
        throw new Error('User already exists')
    }

    // hash the password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // create the user
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
    })

    if(user){
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user.id)
        })
    }else{
        res.status(400)
        throw new Error('Invalid user data')
    }
})

// desc     Login a user
// @route   POST /api/users/login
// access   Public
const loginUser = asyncHandler( async (req, res) => {
    const { email, password } = req.body

    // check for user email
    const user = await User.findOne({email})

    //check if password matches
    if(user && (await bcrypt.compare(password, user.password))){
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user.id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid credentials')
    }

    if(!user)
    res.json({ message: 'login user'})
})

// desc     Get user data
// @route   GET /api/users/me
// access   Private
const getMe = asyncHandler( async (req, res) => {
    res.json({ message: 'display user data'})
})

// Generate JWT
const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' })

module.exports = {
    registerUser, 
    loginUser,
    getMe
}