const {Schema, model} = require('mongoose');
// Статьи

const articlesSchema = new Schema({
    // id_answer
    id_question: {
        type: String,
        required: true,
    },
    // id_business
    id_business: {
        type: String,
        required: true,
    },
    // Текст статьи
    header: {
        type: String,
        required: true
    },
    // Текст статьи
    text: {
        type: String,
        required: true
    }
});

module.exports = model('articles', articlesSchema);
