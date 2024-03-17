const asyncHandler = require('../Middlewares/asyncHandler')
const { Users } = require('../Models/user');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const errorResponse = require('../Utils/errorResponse');

// @Get request to get all users
// @Private method (Token required)
exports.getUsers = asyncHandler(
    async (req, res, next) => {

        if (req.isAdmin) {
            const userList = await Users.find().select("-passwordHash");
            if (!userList) {
                return res.status(204).json({ success: false, message: 'Users not found', users: userList })
            }
            return res.status(200).json({ success: true, message: 'Users found', users: userList })
        }

        return next(new errorResponse('Not authorized to get users', 401))
    }

)

// @Get request to get user data
// @Private method (Token required)
exports.getUser = asyncHandler(
    async (req, res, next) => {

        if (req.isAdmin) {
            const userData = await Users.findById(req.params.id).select("-passwordHash");
            if (!userList) {
                return res.status(204).json({ success: false, message: 'User not found', users: userData })
            }
            return res.status(200).json({ success: true, message: 'User found', users: userData })
        }

        return next(new errorResponse('Not authorized to get user', 401))
    }
)

// @Post request to create a new user
// @Public method (Token not required)
exports.createUser = asyncHandler(
    async (req, res, next) => {
        let newUser = new Users(
            {
                name: req.body.name,
                email: req.body.email,
                passwordHash: bcrypt.hashSync(req.body.password, 10),
                street: req.body.street,
                apartment: req.body.apartment,
                city: req.body.city,
                zip: req.body.zip,
                country: req.body.country,
                phone: req.body.phone,
                isAdmin: false
            }
        )
        const addedUser = await Users.create(newUser)

        if (!addedUser) {
            return next(new errorResponse('Users not Created', 400))
        } else {
            return res.status(200).json({ success: true, message: 'Users created', NewUser: addedUser })
        }
    }
)

// @Post request to log in user
// @Public method (Token not required)
exports.loginUser = asyncHandler(
    async (req, res, next) => {
        const user = await Users.findOne({ email: req.body.email })
        const sceret = process.env.secret
        if (!user) {
            return next(new errorResponse('Wrong Email', 400))
        }
        if (user && bcrypt.compareSync(req.body.password, user.passwordHash)) {
            const token = jwt.sign(
                {
                    userId: user.id,
                    isAdmin: user.isAdmin
                },
                sceret,
                { expiresIn: '3h' }
            )
            return res.status(200).json({success : true, message: "User authenticated", email: user.email, token: token })
        } else {
            return next(new errorResponse('Wrong password', 401))
        }
    }
)