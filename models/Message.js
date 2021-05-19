import { sqliteDB as db } from '../DB/db.js'

class Message {
    get = async () => {
        try {
            return db.from('messages').select()
        }
        catch(err) {
            console.log(err.sqlMessage)
        }
    }

    add = async (message) => {
        try {
        await db.from('messages').insert(message)
        return message
        }
        catch(err) {
            console.log(err.sqlMessage)
        }
    }

    newTable = async () => {
        await db.schema.createTable('messages', table => {
            table.increments('id')
            table.string('author')
            table.string('body')
            table.date('date')
        })
    }
}
export default new Message();