const {Schema, model} = require('mongoose');


const userBusinessSchema = new Schema({
    id_user: {
        type: String,
        required: true
    },
    id_business: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true
    },
    id_question: {
        type: String,
        required: true,
    },
    business_lvl: {
        type: Number,
        required: true
    },
    // Счет в бизнесе
    finance_business: {
        type: String,
        required: true,
    },
    lvl: {
        type: Number,
        required: true
    },
    status_answer: {
        type: String,
        required: true
    },
    status_checked: {
        type: String,
        required: true
    },
    date_waiting: {
        type: Date,
        required: false
    },
    // Путь до картинки
    imageSrc: {
        type: String,
        default: ''
    }
});

module.exports = model('user_business', userBusinessSchema);