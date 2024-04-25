import jwt from 'jsonwebtoken';
import { errorHandler } from './error';

// Create a function to verify the token
export const verifyToken = (req, res, next)=>{
    // get the token from the cookies
    const token = req.cookies.token;
    // check if the token exists
    if(!token){
        return next(errorHandler(401, "you need to login first"));
    }
    // verify the token
    jwt.verify(token, process.env.JWT_SECRET, (err, user)=>{
        if(err){
            return next(errorHandler(403, "token expired or invalid"));
        }
        // set the user in the request object
        req.user = user;
        next();
    })

}