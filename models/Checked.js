const {Schema, model} = require('mongoose');


const checkedSchema = new Schema({
    id_answer: {
        type: String,
        required: true,
    },
    id_checked: {
        type: String,
        required: true
    },
    id_business: {
        type: String,
        required: true
    }
});

module.exports = model('checked', checkedSchema);