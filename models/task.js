const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const postSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    date: {
        type: String,
        required: true
    },
    due_date: {
        type: String,
        required: true
    }

});
module.exports = mongoose.model('Task', postSchema);