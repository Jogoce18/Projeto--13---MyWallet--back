import db from "./../db.js";
import dayjs from "dayjs";
import { ObjectId } from 'mongodb';

import extractsSchema from "../schemas/extractsSchema.js";

export async function getExtract(req, res) {
  const {user} = res.locals;
  try {
    const transactions = await db.collection("transactions").find({userId: user._id}).toArray();
    res.send(transactions);
  } catch (error) {
    console.log("Error getting all financial transactions.");
    console.log(error);
    return res.sendStatus(500);
  }
}
export async function deleteExtract(req, res) {

  const { id } = req.params

  try {
      await db.collection("transactions").deleteOne({ _id: new ObjectId(id) })
      res.sendStatus(200);

  } catch (error) {
      res.sendStatus(error)
  }
}

export async function addExtract(req, res) {
  const { error } = extractsSchema.validate(req.body);
  if(error) return res.status(422).send(error.details.map(detail => detail.message)); // unprocessable entity

  const {user} = res.locals;
  try {
    const { type, description, value } = req.body;
    await db.collection("transactions").insertOne({
      type,
      value,
      description, 
      date: dayjs().format('DD/MM'),
      userId: user._id
    });
    res.sendStatus(201);
  } catch (error) {
    console.log("Error adding new transaction.");
    console.log(error);
    return res.sendStatus(500);
  }
}
