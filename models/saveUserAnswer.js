const {Schema, model} = require('mongoose');


const saveUserAnswerSchema = new Schema({
    id_user: {
        type: String,
        required: true
    },
    id_user_business: {
        type: String,
        required: true
    },
    id_business: {
        type: String,
        required: true
    },
    id_question: {
        type: String,
        required: true
    },
    answer: {
        type: String,
        required: true
    },
    lvl: {
        type: Number,
        required: true
    },
    scores: {
        type: Number,
        required: true
    }
});

module.exports = model('save_user_answer', saveUserAnswerSchema);