const express = require('express');
const controller =require('../controllers/ideas');
const passport= require('passport');
const router = express.Router();

// localhost:5000/api/ideas/output_ideas
// Получение 30 последних идей
router.post('/output_ideas',
    passport.authenticate('jwt', {session: false}),
    controller.outputIdeas);

// localhost:5000/api/ideas/creation_ideas
// Отправка новой идеи
router.post('/creation_ideas',
    passport.authenticate('jwt', {session: false}),
    controller.creationIdea);

module.exports = router;