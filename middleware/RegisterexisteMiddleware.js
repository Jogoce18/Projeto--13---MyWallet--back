import db from '../db.js';
import { ObjectId } from 'mongodb';

export default async function registerExistValidate(req, res) {
    const { id } = req.params;
    const { user } = req.headers;

    try {
        const message = await db
            .collection('transactions')
            .findOne({ _id: new ObjectId(id) });
        if (message) {
            if (message.from === user) {
                await db
                    .collection('transactions')
                    .deleteOne({ _id: new ObjectId(id) });
                res.sendStatus(200);
            } else {
                res.sendStatus(401);
            }
        } else {
            res.sendStatus(404);
        }
    } catch (err) {
        console.log(err);
    }
}