const express = require('express');
const controller =require('../controllers/profile');
const passport= require('passport');
const router = express.Router();

// localhost:5000/api/user/output_profile
// Получение данных профиля
router.post('/output_profile',
    passport.authenticate('jwt', {session: false}),
    controller.outputProfile);

// localhost:5000/api/user/change_profile
// Изменение данных профиля
router.post('/change_profile',
    passport.authenticate('jwt', {session: false}),
    controller.changetProfile);

// localhost:5000/api/user/change_password
// Изменение пароля
router.post('/change_password',
    passport.authenticate('jwt', {session: false}),
    controller.changePassword);

// localhost:5000/api/user/output_progress
// Получение данных прогресс-бара
router.post('/output_progress',
    passport.authenticate('jwt', {session: false}),
    controller.outputProgress);

module.exports = router;