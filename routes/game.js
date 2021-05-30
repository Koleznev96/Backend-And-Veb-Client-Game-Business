const express = require('express');
const controller =require('../controllers/business');
const passport= require('passport');
const router = express.Router();

// localhost:5000/api/game/new_business
router.post('/new_business',
    passport.authenticate('jwt', {session: false}),
    controller.createNewBusiness);

// localhost:5000/api/game/output_user_businesses_all
router.post('/output_user_businesses_all',
    passport.authenticate('jwt', {session: false}),
    controller.outputUserBusinessesAll);

// localhost:5000/api/game/output_user_business/:id
router.get('/output_user_business/:id',
    passport.authenticate('jwt', {session: false}),
    controller.outputUserBusiness);

// localhost:5000/api/game/output_business
router.get('/output_business',
    passport.authenticate('jwt', {session: false}),
    controller.outputBusiness);

// localhost:5000/api/game/add_answer
// Добавление ответа
router.post('/add_answer',
    passport.authenticate('jwt', {session: false}),
    controller.addAnswer);

// localhost:5000/api/game/checked_answer
// Получение трех ответов для оценки
router.post('/checked_answer',
    passport.authenticate('jwt', {session: false}),
    controller.checkedAnswer);

// localhost:5000/api/game/hand_check_answer
// Передача трех оцененных ответа
router.post('/hand_check_answer',
    passport.authenticate('jwt', {session: false}),
    controller.handCheckAnswer);

// localhost:5000/api/game/increase_business_lvl
// Повышение бизнес лвл
router.post('/increase_business_lvl',
    passport.authenticate('jwt', {session: false}),
    controller.increaseBusinessLvl);

// localhost:5000/api/game/withdrawal_money_business
// Запрос на вывод денег из бизнеса
router.post('/withdrawal_money_business',
    passport.authenticate('jwt', {session: false}),
    controller.withdrawalMoneyBusiness);

// localhost:5000/api/game/output_question
// Получение данных о вопросе + статья
router.post('/output_question',
    passport.authenticate('jwt', {session: false}),
    controller.outputQuestion);

module.exports = router;
