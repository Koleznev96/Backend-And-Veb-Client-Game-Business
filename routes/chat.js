const express = require('express');
const controller =require('../controllers/chat');
const passport= require('passport');
const router = express.Router();

// localhost:5000/api/chat/output_messages
// Получение 30 последних сообщений
router.post('/output_messages',
    passport.authenticate('jwt', {session: false}),
    controller.outputMessages);

// localhost:5000/api/chat/creation_message
// Отправка своего сообщения
router.post('/creation_message',
    passport.authenticate('jwt', {session: false}),
    controller.creationMessage);

module.exports = router;