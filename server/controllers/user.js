import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import userMessage from '../models/userMessage.js';

export const signin = async(req,res) => {
    const { username, password } = req.body;
    try{
        const existingUser = await userMessage.findOne({username});
        if(!existingUser) return res.status(404).json({ message: "User doesn't exist"});
        const passwordCorrect = await bcrypt.compare(password,existingUser.password);
        if(!passwordCorrect) return res.status(404).json({ message: "Invalid Credentials"});
        //the "test" is a secret and should be stored in env
        const token = jwt.sign({ username: existingUser.username, id: existingUser._id},process.env.SECRET, { expiresIn: "1h"});
        
        res.status(200).json({result: existingUser, token});

    } catch(error){ 
        res.status(500).json({ message: 'Something went wrong'});
    }
}

export const signup = async(req,res) =>{
    const { password, confirmPassword, firstName, lastName, username} = req.body;

    try{    
        const existingUser = await userMessage.findOne({ username });
        if(existingUser) return res.status(400).json({ message: "User already exists"});
        if(password !== confirmPassword) return  res.status(404).json({ message: "Passwords don't match"});
        const hashedPass = await bcrypt.hash(password, 12);
        const result = await userMessage.create({ username, password: hashedPass, name: `${firstName} ${lastName}` });
        //the "test" is a secret and should be stored in env
        const token = jwt.sign({username: result.username, id: result._id}, process.env.SECRET, {expiresIn: "1h"});
        
        res.status(200).json({result, token});
    }catch(error){
        res.status(500).json({ message: 'Something went wrong'});
    }
}

