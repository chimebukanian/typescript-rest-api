import express from 'express';

import {createUser, getUserByEmail, UserModel} from '../db/users';
import {random, authentication} from '../helpers';

export const login = async (req: express.Request, res: express.Response) =>{
    try{
        const {email, password} = req.body;
        if(!email || !password){
            res.sendStatus(400);
        }
        
        const user= await getUserByEmail(email).select('+authentication.salt +authentication.password');

        if(!user){
            return res.sendStatus(400);
        }

        const expectedHash = authentication(user.authentication.salt, password);
        if (expectedHash != user.authentication.password){
            return res.sendStatus(400)
        }

        const salt = random();
        user.authentication.sessionToken = authentication(salt, user._id.toString());

        await user.save();

        res.cookie('EBUKA_cookie', user.authentication.sessionToken, {domain: 'localhost', path: '/'});
        return res.status(200).json(user).end();
    }catch(err){
        console.log(err);
    }
}
export const register = async (req: express.Request, res: express.Response)=>{
    try{
        const {email, password, username} = req.body;
        
        if (!email  || !password || !username){
            return res.sendStatus(400);
        }

        const existintgUser = await getUserByEmail(email);
        if (existintgUser){
            return res.sendStatus(400);
        }

        const salt= random();
        const user = await createUser({
            email,
            username,
            authentication: {
                salt,
                password: authentication(salt, password),
            },
        });
        
        return res.status(200).json(user).end();
    }catch(err){
        console.log(err);
        return res.sendStatus(400);
    }
}