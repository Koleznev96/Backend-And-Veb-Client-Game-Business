const {Schema, model} = require('mongoose');


const userAnswerSchema = new Schema({
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
    number_checks: {
        type: Number,
        required: true
    },
    scores: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true
    }
});

module.exports = model('user_answer', userAnswerSchema);