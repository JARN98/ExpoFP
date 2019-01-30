import jwt from 'jsonwebtoken'
import Promise from 'bluebird'
import { jwtSecret } from '../../config'

const jwtSign = Promise.promisify(jwt.sign)
const jwtVerify = Promise.promisify(jwt.verify)

export const sign = (id, email, role, options, method = jwtSign) =>
  method({ id, email, role }, jwtSecret, options)

export const signSync = (id, options) => sign(id, options, jwt.sign)

export const verify = (token) => jwtVerify(token, jwtSecret)
