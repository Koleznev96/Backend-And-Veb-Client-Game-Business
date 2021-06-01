const dateformat = require('dateformat');
const errorHandler = require('../utils/errorHandler');
const errorLog = require('../utils/errorLog');

const Profile = require('../models/Profile');
const Ideas = require('../models/Ideas');

// Сделать через GET -----
// Получение последних 30 идей
module.exports.outputIdeas = async function(req, res) {
    try {
        const ideas = await Ideas.find().sort('date').limit(30);
        res.status(201).json(ideas);
    } catch(e) {
        errorHandler(res, e);
    }
}

// (Проверки длины идеи)--------------
// Создание идеи
// {"text": "text_text"}
module.exports.creationIdea = async function(req, res) {
    const profile = await Profile.findOne({
        id_user: req.user.id
    });
    if (!profile.nickname || !profile.name) return res.status(401).json({message: "Для того чтобы писать сообщения нужно заполнить данные профиля"});
    const new_idea = new Ideas({
        author: profile.nickname,
        text: req.body.text,
        likes: 0,
        date: new Date()
    });
    try {
        await new_idea.save();
        const ideas = await Ideas.find().sort('date').limit(30);
        res.status(201).json(ideas);
    } catch(e) {
        errorHandler(res, e);
    }
}
