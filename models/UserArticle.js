const {Schema, model} = require('mongoose');
// Статьи

const userArticlesSchema = new Schema({
    id_user: { type: Schema.Types.ObjectId, ref: 'users' },
    // id_answer
    id_article: { type: Schema.Types.ObjectId, ref: 'articles' },
    // id_business
    id_business: { type: Schema.Types.ObjectId, ref: 'type_business' },
});

module.exports = model('userArticles', userArticlesSchema);
