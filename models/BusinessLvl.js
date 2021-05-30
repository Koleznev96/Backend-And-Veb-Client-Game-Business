const {Schema, model} = require('mongoose');


const businessLvlSchema = new Schema({
    lvl: {
        type: Number,
        required: true,
    },
    amount_answer: { // При получение оценки за его ответ сколько получит за один балл из 3-х
        type: String,
        required: true
    },
    amount_improvement: { // сколько стоит повышение лвл бизнеса
        type: String,
        required: true
    },
    amount_appraisal: { // сколько получит при проверке чужих ответов
        type: String,
        required: true
    }
});

module.exports = model('business_lvl', businessLvlSchema);