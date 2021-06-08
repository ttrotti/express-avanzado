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
            return await messages.find({})
        }
        catch(err) {
            console.log(err)
        }
    }

    add = async (message) => {
        try {
            await messages(message).save()
            return message
        }
        catch(err) {
            console.log(err)
        }
    }
}

export default new Message();