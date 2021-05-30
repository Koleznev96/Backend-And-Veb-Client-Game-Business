const {Schema, model} = require('mongoose');
// Профиль

const profileSchema = new Schema({
    //id_user - id юзера
    id_user: {
        type: String,
        required: true,
    },
    // Имя
    name: {
        type: String,
        required: false
    },
    // Никнейм
    nickname: {
        type: String,
        required: false
    },
    // Количество очков (25, 50, 75, 100)
    scores: {
        type: Number,
        required: false
    },
    // Общий lvl
    lvl: {
        type: Number,
        required: false
    },
    // Финансы
    finance: {
        type: String,
        required: false
    }
});

module.exports = model('profile', profileSchema);