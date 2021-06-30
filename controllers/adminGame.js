const errorHandler = require('../utils/errorHandler');

const typeBusiness = require('../models/TypeBusiness');
const typeQuestion = require('../models/TypeQuestion');
const userBusiness = require('../models/UserBusiness9');
const userAnswer = require('../models/UserAnswer');
const checked = require('../models/Checked');
const businessLvl = require('../models/BusinessLvl');
const Chat = require('../models/Chat');
const Articles = require('../models/Articles');

const number_review = 3;
const number_answer = 3;
const status_answer_expectation_answer = "expectation_answer"; // ждет ответа
const status_answer_assessment_answer = "assessment_answer"; // ответ отправлен, ждет оценки
const status_answer_stop = "stop"; // Остановка бизнеса до повышения лвл
const status_checked_false = "false"; // может проверять чужие ответы
const status_checked_true = "true"; // не может проверять чужие ответы


// (Сделать админ базу + авторизация для админов)-----------

module.exports.addArticle = async function(req, res) {
    const addArticles = new Articles({
        id_question: req.body.id_question,
        id_business: req.body.id_business,
        header: req.body.header,
        text: req.body.text,
    });
    try {
        await addArticles.save();
        res.status(201).json(addArticles);
    } catch(e) {
        errorHandler(res, e)
    }
}

module.exports.outputArticle = async function(req, res) {
    try {
        const articles = await Articles.find();
        res.status(201).json(articles);
    } catch(e) {
        errorHandler(res, e)
    }
}

module.exports.addBusinessLvl = async function(req, res) {
    const addbusinessLvl = new businessLvl({
        lvl: req.body.lvl,
        amount_answer: req.body.amount_answer,
        amount_improvement: req.body.amount_improvement,
        amount_appraisal: req.body.amount_appraisal
    });

    try {
        await addbusinessLvl.save();
        res.status(201).json(addbusinessLvl);
    } catch(e) {
        errorHandler(res, e)
    }
}

module.exports.addBusiness = async function(req, res) {
    const addTypeBusiness = new typeBusiness({
        name: req.body.name_business,
        raty: req.body.raty_business,
        number_users: 0,
        valuable: req.body.valuable_business,
        imageSrc: req.file ? req.file.path : '',
        description: req.body.description,
    });

    try {
        await addTypeBusiness.save();
        res.status(201).json(addTypeBusiness);
    } catch(e) {
        errorHandler(res, e)
    }
}


module.exports.addQuestion = async function(req, res) {
    const addTypeQuestion = new typeQuestion({
        id_business: req.body.id_business,
        question: req.body.question,
        lvl: req.body.lvl,
        rate: req.body.rate
    });

    try {
        await addTypeQuestion.save();
        res.status(201).json(addTypeQuestion);
    } catch(e) {
        errorHandler(res, e)
    }
}

// получения всех бизнесов
module.exports.outputBusiness = async function(req, res) {
    const business = await typeBusiness.find();
    res.status(201).json(business);
}

// получения всех вопросов(по id бизнеса)
module.exports.outputQuestion = async function(req, res) {
    let question;
    if (req.body.id_business) {
        question = await typeQuestion.find({id_business: req.body.id_business});
    } else {
        question = await typeQuestion.find();
    }
    res.status(201).json(question);
}

// удаление всех бизнесов, ответов, проверок
module.exports.deleteVse = async function(req, res) {
    try {
        await userBusiness.deleteMany();
        await userAnswer.deleteMany();
        await checked.deleteMany();
        res.status(201).json("ok");
    } catch(e) {
        errorHandler(res, e);
    }
}

// создание бизнеса + ответа
// id_new_business, name_new_business
module.exports.test_admin = async function(req, res) {
    try {
        const question = await typeQuestion.findOne({
            id_business: req.body.id_new_business,
            lvl: 1
        });
        const newBusiness = new userBusiness({
            id_user: req.user.id,
            id_business: req.body.id_new_business,
            name: req.body.name_new_business,
            id_question: question._id,
            lvl: 1,
            status_answer: status_answer_assessment_answer,
            status_checked: status_checked_true
        });
        const newAnswer = new userAnswer({
            id_user: req.user.id,
            id_user_business: newBusiness._id,
            id_business: req.body.id_new_business,
            id_question: question._id,
            answer: req.body.answer,
            number_checks: 0,
            scores: 0,
            status: status_checked_true
        });
        await newBusiness.save();
        await newAnswer.save();
        res.status(201).json({
            newBusiness: newBusiness,
            newAnswer: newAnswer
        });
    } catch(e) {
        errorHandler(res, e)
    }
}

module.exports.deleteChat = async function(req, res) {
    try {
        await Chat.deleteMany();
        res.status(201).json("ok");
    } catch(e) {
        errorHandler(res, e);
    }
}
