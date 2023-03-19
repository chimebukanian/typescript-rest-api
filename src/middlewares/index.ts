import express from "express";
import {get, merge} from "lodash";
import { getUserBySessionToken } from "../db/users";


export const isOwner = async (req: express.Request, res: express.Response, next: express.NextFunction)=>{
    try{
        const {id} = req.params;
        const userid = get(req, 'identity._id') as string;

        if(!userid){
            return res.sendStatus(403);
            
        }
        if(userid.toString() != id){
            return res.sendStatus(403);
        }

        return next();
    }catch(err){
        console.log(err);
        return res.sendStatus(400);
    }
}
export const isauthenticated = async (req: express.Request, res: express.Response, next: express.NextFunction)=>{


    try{
    const sessionToken = req.cookies['EBUKA_cookie'];
    if(!sessionToken){
        return res.sendStatus(400);
    }
    const existingUser = await getUserBySessionToken(sessionToken);
    if (!existingUser){
        return res.sendStatus(400);
    }

    await merge(req, {identity: existingUser});
    return next();

    }catch(err){
        console.log(err);
        return res.sendStatus(400);
    }
}