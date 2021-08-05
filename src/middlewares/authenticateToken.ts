
/* eslint-disable @typescript-eslint/consistent-type-assertions */
import * as jwt from 'jsonwebtoken'
import sysConstant from '../config/system-constant'

export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.sendStatus(401)

    jwt.verify(token, sysConstant.jwtSecret as string, (err: any, user: any) => {
        console.log(err)

        if (err) return res.sendStatus(403)

        req.user = user

        next()
    })
}
