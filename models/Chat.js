const {Schema, model} = require('mongoose');
// Чат

const chatSchema = new Schema({
    // Автор
    author: {
        type: String,
        required: true,
    },
    // Текст сообщения
    text: {
        type: String,
        required: true
    },
    // Дата
    date: {
        type: String,
        required: false
    }
});

module.exports = model('chat', chatSchema);