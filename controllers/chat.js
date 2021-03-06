const dateformat = require('dateformat');
const errorHandler = require('../utils/errorHandler');
const errorLog = require('../utils/errorLog');

const Profile = require('../models/Profile');
const Chat = require('../models/Chat');

// Сделать через GET ----
// Получение последних 30 сообщений
module.exports.outputMessages = async function(req, res) {
    try {
        let chat = await Chat.find().sort('date_new');
        res.status(201).json(chat);
    } catch(e) {
        errorHandler(res, e);
    }
}

// (Проверка на пустоту сообщения)-----------
// Создание сообщения
// {"text": "text_text"}
module.exports.creationMessage = async function(req, res) {
    console.log("00000")
    const profile = await Profile.findOne({
        id_user: req.user.id
    });
    if (!profile.nickname || !profile.name) return res.status(401).json({message: "Для того чтобы писать сообщения нужно заполнить данные профиля"});
    let date_message = new Date();
    date_message = dateformat(date_message, "h:MM");
    const new_message = new Chat({
        author: profile.nickname,
        text: req.body.text,
        date: date_message,
        date_new: new Date()
    });

    try {
        await new_message.save();
        const chat = await Chat.find().sort('date_new');
        res.status(201).json(chat);
    } catch(e) {
        errorHandler(res, e);
    }
}
