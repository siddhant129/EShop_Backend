const expressJwt = require("express-jwt")
const jwt = require('jsonwebtoken')
const secret = process.env.secret
const api = process.env.API_URL
function userAuth() {
    // var flag = isRevoked
    if (isRevokedFun) {
        console.log('hi')
    }
    console.log('isRevoked', isRevokedFun)

    return expressJwt.expressjwt({
        secret,
        algorithms: ['HS256'],
        getToken: (req, res, next) => {
            console.log(req.authorization);
        }
        // isRevoked: isRevokedFun
    }).unless({
        path: [`${api}/user/login`,
        `${api}/user/register`,
        { url: /\/api\/v1\/products(.*)/, methods: ['GET', 'OPTIONS'] },
        { url: /\/api\/v1\/category(.*)/, methods: ['GET'] },

        ]
    })
}

// 

function auth() {

    return expressJwt.expressjwt({
        secret: process.env.secret,
        algorithms: ['HS256'],
        getToken: function setUserId(req) {

            if (req.headers.authorization) {
                if (req.headers.authorization.split(' ')[0] === 'Bearer' ) {
                    const token = req.headers.authorization.split(' ')[1]
                    let payload = jwt.decode(token)
                    req.userId = payload.userId
                    req.isAdmin = payload.isAdmin
                    return token
                } else if (req.headers.authorization.split(' ')[0]) {
                    const token = req.headers.authorization.split(' ')[0]
                    let payload = jwt.decode(token)
                    req.userId = payload.userId
                    req.isAdmin = payload.isAdmin
                    return token
                }
            }
            req.isAdmin = false
            return null
        },
        isRevoked : function isAdmin(req) {
            return req.isAdmin
        }
    }).unless(
        {
            path: [
                `${api}/user/login`,
                `${api}/user/register`
            ]
        }
    )
}

async function isRevokedFun(req, payload) {
    console.log(payload)
    if (payload.isAdmin == false) {
        console.log(payload.isAdmin)

        return true
        // return false
    }
    return false
}

module.exports = userAuth;
module.exports = auth;