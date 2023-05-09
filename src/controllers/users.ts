import express from 'express';
import { getUsers, deleteUserById, updateUserById, getUserById } from '../db/users';

export const getAllUsers = async (req:express.Request, res:express.Response) => {
    try{
        const users = await getUsers();
        return res.status(200).json(users).end();
    }catch(err){
        console.log(err);
        return res.sendStatus(400);
    }
}

export const deleteUser = async (req: express.Request, res: express.Response)=>{
    try{
        const {id} = req.params;
        const deleted = await deleteUserById(id);
        return res.status(200).json(deleted).end();

    }catch(err){
        console.log(err);
        return res.sendStatus(400);

    }
}

export const updateUser = async (req: express.Request, res: express.Response)=>{
    try{
        const {id} = req.params;
        const user = req.body;
        console.log(user);
 

        if(!user){
            return res.sendStatus(400);
        }

        const updated = await updateUserById(id, user);
        await updated.save();
        return res.status(200).json(user).end();

    }catch(err){
        console.log(err);
        return res.sendStatus(400);
    }
}