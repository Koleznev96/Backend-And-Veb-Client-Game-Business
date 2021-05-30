const {Schema, model} = require('mongoose');
// Новости

const newsSchema = new Schema({
    // Заголовок
    heading: {
        type: String,
        required: true,
    },
    // Текст новости
    text: {
        type: String,
        required: true
    },
    // Дата
    date: {
        type: Date,
        required: false
    }
});

module.exports = model('news', newsSchema);