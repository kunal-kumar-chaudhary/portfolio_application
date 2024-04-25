import User from '../models/user.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { errorHandler } from '../utils/error.js';


export const signup = async (req, res, next)=>{
    const {username, email, password} = req.body;

    if (!username || !email || !password){
        return next(errorHandler(400, "all fields are required"));
    }
    // hashing password
    const hashedPassword = await bcrypt.hash(password, 10);
    // create a new user
    try{
    const user = await User.create({
        username,
        email,
        password: hashedPassword,
    });
    res.json({message: "user created successfully"});
}catch(err){
    return next(errorHandler(400, "user already exists"))
}
};


export const login = async (req, res, next)=>{
    const {email, password} = req.body;
    if (!email || !password){
        return next(errorHandler(400, "all fields are required"));
    }
    try{
        // find the user
        const user = await User.findOne({email});
        if (!user){
            return next(errorHandler(400, "invalid credentials"));
        }
        // compare the password and return the user
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid){
            return next(errorHandler(400, "invalid credentials"));
        }
        // create a token
        const token = jwt.sign({id: user._id, isAdmin: user.isAdmin}, process.env.JWT_SECRET, {expiresIn: "1d"});
        const {password: pass, ...rest} = user._doc;

        // send the token in the cookies
        res.status(200).cookie("token", token, {httpOnly: true}).json(rest);

    }
    catch(err){
        return next(errorHandler(400, "invalid credentials"));
    }
}

export const logout = async (req, res, next)=>{
    const token = req.cookies.token;
    if (!token){
        return next(errorHandler(401, "you need to login first"));
    }
    // clear the cookie if there is a token inside of it
    res.clearCookie("token").json({message: "logout successful"});
}

export const google = async (req, res, next)=>{
    
}

export const github = async (req, res, next)=>{

}