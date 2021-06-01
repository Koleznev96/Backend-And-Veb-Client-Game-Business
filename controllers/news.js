const dateformat = require('dateformat');
const errorHandler = require('../utils/errorHandler');

const News = require('../models/News');

// Сделать через GET -----
// Получение последних 10 новостей
module.exports.outputNews = async function(req, res) {
    try {
        let news = await News.find().sort('date').limit(10);
        news = news.reverse();
        res.status(201).json(news);
    } catch(e) {
        errorHandler(res, e);
    }
}

// (Перенести в ADMIN + Проверки)------------------
// Создание новости
module.exports.addNews = async function(req, res) {
    let date_message = new Date();
    let month = date_message.getMonth() + 1;
    let day = date_message.getDate();
    let year = date_message.getFullYear();
    date_message = dateformat(date_message, "h:MM");
    const news = new News({
        heading: req.body.heading,
        text: req.body.text,
        date: day + "." + month + "." + year + " " + date_message
    });

    try {
        await news.save();
        res.status(201).json(news);
    } catch(e) {
        errorHandler(res, e);
    }
}
