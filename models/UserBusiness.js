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
    // T/F
    handler_task: {
        type: Boolean,
        required: true
    },
    // T/F
    handler_checked: {
        type: Boolean,
        required: true
    },
    // ObjectId(UserAnswer)
    answer_send: {
        type: Schema.Types.ObjectId,
        ref: 'user_answer',
        required: false
    },
    // ObjectId(saveUserAnswer)
    answer_checked: {
        type: Schema.Types.ObjectId,
        ref: 'save_user_answer',
        required: false
    },
    // Date()
    answer_date_waiting: {
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
