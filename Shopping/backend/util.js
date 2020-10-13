import jwt from 'jsonwebtoken';
import config from './config';
export const getToken = (user) => {
    return jwt.sign({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin
    }, config.JWT_SECRET, {
        expiresIn: '48h'
    })
}

export const isAuth = (req, res, next) => {

    const token = req.headers.authorization;
    // You will get = Bearer ...token
    // console.log('Token: ', token)
    if (token) {
        const onlyToken = token.slice(7, token.length);
        // You will get = ...token
        jwt.verify(onlyToken, config.JWT_SECRET, (err, decode) => {
            if (err) {
                return res.status(401).send({ msg: 'Invalid Token' });
            }
            else {
                // console.log('Decode', decode)
                // return {}
                req.user = decode;
                next();
                return
            }
        });
    } else {
        return res.status(401).send({ msg: "Token is not supplied" })
    }
}

export const isAdmin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        // console.log('Admin pass');
        return next();
    }
    return res.status(401).send({ msg: 'Admin Token is not valid' })
}
