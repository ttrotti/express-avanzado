// import { sqliteDB as db } from '../DB/db.js'
import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
    author: {
        type: String,
        required: true,
        minlength: 3
    },
    body: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true
    }
})

const messages = mongoose.model('mensajes', messageSchema);

class Message {
    get = async () => {
        try {
            // return db.from('messages').select()
            return await messages.find({})
        }
        catch(err) {
            console.log(err)
        }
    }

    add = async (message) => {
        try {
            // await db.from('messages').insert(message)
            await messages(message).save()
            return message
        }
        catch(err) {
            console.log(err)
        }
    }

    // newTable = async () => {
    //     await db.schema.createTable('messages', table => {
    //         table.increments('id')
    //         table.string('author')
    //         table.string('body')
    //         table.date('date')
    //     })
    // }
}

export default new Message();