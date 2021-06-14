import mongoose from 'mongoose';
import normalizr from 'normalizr';
const normalize = normalizr.normalize;
const schema = normalizr.schema;

const messageSchema = new mongoose.Schema({
    author: {
        email: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true   
        },
        surname: {
            type: String,
            required: true
        },
        age: {
            type: Number,
            required: true
        },
        alias: {
            type: String,
            required: true
        },
        avatar: {
            type: String,
            required: true
        }
    },
    text: {
        body: {
            type: String,
            required: true,
        }
    }
})

const messages = mongoose.model('mensajes', messageSchema);

const schemaAuthor = new schema.Entity("author", {}, {idAttribute: 'email'})
const schemaText = new schema.Entity("text", {})

const normalizrMessage = new schema.Entity("message", {
    author: schemaAuthor,
    text: schemaText
})

class Message {
    get = async () => {
        try {
            const files = await messages.find({})
            const filesWithId = {
                id: 'mensajes',
                messages: files.map(message => ({...message._doc}))
            }
            const normalizedFiles = normalize(filesWithId, normalizrMessage)
            return normalizedFiles
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