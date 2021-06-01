const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const keys = require('../config/keys');
const Profile = require('../models/Profile');
const errorHandler = require('../utils/errorHandler');


//(Проверять длину email, пароль) + проверка email на норм email)--------
module.exports.login = async function(req, res) {
    console.log("body", req.body);
    console.log("=======================");
    const candidate = await User.findOne({email: req.body.email});

    if (candidate) {
        // Проверка пароля, пользователь существует
        const passwordResult = bcrypt.compareSync(req.body.password, candidate.password);
        if (passwordResult) {
            // Генерация токена, пароли совпали
            const token = jwt.sign({
                email: candidate.email,
                userId: candidate._id
            }, keys.jwt, {expiresIn: 60 * 60});

            res.status(200).json({
                token: `Bearer ${token}`
            });
        } else {
            // Пароли не совпали
            res.status(401).json({
                message: 'Пароли не совпадают. Попробуйте снова.'
            });
        }
    }else {
        // Пользователя нет, ошибка
        res.status(404).json({
            message: 'Пользователь с таким email не найден.'
        });
    }
}

//(Проверять длину email, пароль) + проверка email на норм email)--------
//(Добавить имя, никнейм + их проверки на длину)----------
module.exports.register = async function(req, res) {
    const candidate = await User.findOne({email: req.body.email});
    console.log("00000");
    if (candidate) {
        // Пользователь существует, нужно отправить ошибку
        res.status(409).json({
            message: 'Такой email уже занят. Попробуйте другой.'
        });
    } else {
        // Нужно создать пользователя
        console.log("11111111");
        const salt = bcrypt.genSaltSync(10);
        const password = req.body.password;
        console.log("222222");
        const user = new User({
            email: req.body.email,
            password: bcrypt.hashSync(password, salt),
        });
        console.log(user);
        console.log("333333333");
        const profile = new Profile({
            id_user: user._id,
            name: "",
            nickname: "",
            scores: 0,
            lvl: 1,
            finance: "100000"
        });
        console.log("4444444444");
        try {
            await user.save();
            console.log("5555555555");
            await profile.save();
            console.log("666666666");
            // Генерация токена, пароли совпали
            const token = jwt.sign({
                email: user.email,
                userId: user._id
            }, keys.jwt, {expiresIn: 60 * 60});
            console.log("77777777777");
            res.status(201).json({
                token: `Bearer ${token}`
            });
        } catch(e) {
            errorHandler(res, e)
        }
    }
}
