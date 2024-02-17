const mongoose = require('mongoose')
const { Users } = require('../Models/user')
const express = require('express')
const router = express.Router()
const { getUsers, getUser, createUser, loginUser } = require('../Controller/userController')

require('dotenv/config')

router
//To get all users
.get('/', getUsers)

//To get specific user
.get('/:id', getUser)

//To create user
.post('/register', createUser)

//User log in
.post('/login', loginUser)

module.exports = router;