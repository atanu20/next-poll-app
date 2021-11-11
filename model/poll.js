
import mongoose  from "mongoose"

const pollSchema = new mongoose.Schema({

    question: {
        type: String,
        required: true,
    },
    answer1: {
        answer_title: { type: String, required: true },
        answer_review: { type: Number, required: true, default: 0 }
    },
    answer2: {
        answer_title: { type: String, required: true },
        answer_review: { type: Number, required: true, default: 0 }
    },
    answer3: {
        answer_title: { type: String, required: true },
        answer_review: { type: Number, required: true, default: 0 }
    },
    answer4: {
        answer_title: { type: String, required: true },
        answer_review: { type: Number, required: true, default: 0 }
    },
    reviews: {
        type: Array,
    },

    date: {
        type: Date,
        default: new Date(),
    }

})
const pollTable = mongoose.model('Poll') || mongoose.model('Poll', pollSchema)
export default pollTable