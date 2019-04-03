const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Publication = new Schema(
    {
        title: {
            type: String,
            required: true,
            minlength: 3
        },
        text: {
            type: String
        }
    },
    {
        versionKey: false
    })

module.exports = mongoose.model('Publication', Publication);