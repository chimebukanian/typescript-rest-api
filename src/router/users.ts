import express from 'express';
import { getAllUsers , deleteUser, updateUser} from '../controllers/users';
import {isauthenticated, isOwner} from "../middlewares";

export default (router: express.Router)=>{
    router.get('/users', getAllUsers);
    router.delete('/user/:id', isauthenticated, isOwner, deleteUser);
    router.put('/user/:id', isauthenticated, isOwner, updateUser);
}

