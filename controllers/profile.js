const bcrypt = require('bcryptjs');
const errorHandler = require('../utils/errorHandler');

const User = require('../models/User');
const Profile = require('../models/Profile');

// Сделать через GET-----
// Получение всех данных из профиля + рейтинг
module.exports.outputProfile = async function(req, res) {
    try {
        const profile = await Profile.findOne({
            id_user: req.user.id
        });
        let user = await User.findOne({
            _id: req.user.id
        });
        // Вычисляем рейтинг
        const profile_all = await Profile.find();
        let rating = 1;
        for (let i = 0 ; i < profile_all.length; i++) {
            if (profile_all[i].lvl > profile.lvl) {
                rating += 1;
            }
        }

        res.status(201).json({
            profile: profile,
            rating: rating,
            email: user.email
        });
    } catch(e) {
        errorHandler(res, e);
    }
}

// (Добавить проверку на длину никнейма, имя, email; подтверждение email)---
// Изменение данных профиля
// {"name": "name_text", "nickname": "nickname_text"}
module.exports.changetProfile = async function(req, res) {
    let profile = await Profile.findOne({
        id_user: req.user.id
    });
    let user = await User.findOne({
        _id: req.user.id
    });
    if (req.body.name) profile.name = req.body.name;
    if (req.body.nickname) profile.nickname = req.body.nickname;
    if (req.body.email) user.email = req.body.email;
    try {
        await profile.save();
        await user.save();
        res.status(201).json({message: 'Данные профиля изменены.'});
    } catch(e) {
        errorHandler(res, e);
    }
}

// (Добавить проверку на длину пароля)----
// Изменение пароля
// {"password": "password_text"}
module.exports.changePassword = async function(req, res) {
    const {password, newPassword, repeatPassword} = req.body;
    let user = await User.findOne({
        _id: req.user.id
    });
    const passwordResult = bcrypt.compareSync(password, user.password);
    if (passwordResult && newPassword === repeatPassword) {
        const salt = bcrypt.genSaltSync(10);
        user.password = bcrypt.hashSync(newPassword, salt)
        try {
            await user.save();
            res.status(201).json({message: 'Пароль изменен.'});
        } catch(e) {
            errorHandler(res, e);
        }
    } else {
        res.status(401).json({message: 'Пароли не совпадают. Попробуйте снова.'});
    }
}

// Сделать через GET------------
// Получение данных для прогресс-бар
module.exports.outputProgress = async function(req, res) {
    try {
        const profile = await Profile.findOne({
            id_user: req.user.id
        });
        const progress = profile.scores;
        const lvl = profile.lvl;
        res.status(201).json({
            progress: progress,
            lvl: lvl
        });
    } catch(e) {
        errorHandler(res, e);
    }
}
