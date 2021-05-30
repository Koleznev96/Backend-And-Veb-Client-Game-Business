const {Schema, model} = require('mongoose');
// Идеи

const ideasSchema = new Schema({
    // Автор
    author: {
        type: String,
        required: true,
    },
    // Текст идеи
    text: {
        type: String,
        required: true
    },
    // Количество лайков
    likes: {
        type: Number,
        required: false
    },
    // Дата
    date: {
        type: Date,
        required: false
    }
});

module.exports = model('ideas', ideasSchema);