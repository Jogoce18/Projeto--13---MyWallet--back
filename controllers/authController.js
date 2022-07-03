import db from "./../db.js";
import bcrypt from "bcryptjs";
import {v4 as uuid} from "uuid";
import { signSchema,signinSchema} from "../schemas/authSchemas.js";

export async function signup(req,res){
    const{name,email,password}= req.body;
    const{error}=signSchema.validate(req.body,{abortEarly: false});
    if(error){
        return res.status(422).send(error.details.map(detail=> detail.message));
    }
    try {
        const VALOR = 10;
        await db.collection("users").insertOne({
            name,
            email,
            password: bcrypt.hashSync(password,VALOR) /*encript password*/
        });
     res.sendStatus(201);
    } catch (error) {
        console.log("Error creating new user.");
        console.log(error);
        return res.sendStatus(500);
    }
}

export async function signin(req,res){
    const{error}=signinSchema.validate(req.body,{abortEarly: false});
    if(error){
        return res.status(422).send(error.details.map(detail=> detail.message));
    }
    
    try {
       const user=await db.collection("users").findOne({
            email: req.body.email,
        });
        if(!user) return res.sendStatus(404);
        if(user && bcrypt.compareSync(req.body.password, user.password)){
            const token= uuid();
            await db.collection("sessions").insertOne({token,userId:user._id});
            console.log({token,userId:user._id})
           return  res.send({token, name: user.name});
        }

    } catch (error) {
        console.log("Error creating new user.");
        console.log(error);
        return res.sendStatus(500);
    } 
}
export async function logOut(req, res) {
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '').trim();

    if (!token) {
        return res.status(401).send('Unauthorized');
    }

    try {
        await db.collection('sessions').deleteOne({ token });
        res.status(200).send('Logged out');
    } catch (err) {
        console.log(err);
    }
}