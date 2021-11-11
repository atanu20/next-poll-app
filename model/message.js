
import mongoose  from "mongoose"

const msgSchema = new mongoose.Schema({

    userid: {
        type: String,
       
    },
    username: {
        type: String,
        
    },
    
    message: {
        type: String,
    },

    date: {
        type: Date,
        default: new Date(),
    }

})
const messageTable = mongoose.model('Message') || mongoose.model('Message', msgSchema)
export default messageTable