const express = require('express');
const controller =require('../controllers/news');
const passport= require('passport');
const router = express.Router();

// localhost:5000/api/news/output_news
// Получение 10 последних новостей
router.post('/output_news',
    passport.authenticate('jwt', {session: false}),
    controller.outputNews);

// localhost:5000/api/news/add_news
// ПДобавление нвоости
router.post('/add_news', controller.addNews);

module.exports = router;
