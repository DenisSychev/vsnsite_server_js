const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Publication = new Schema(
    {
        userid: {
            type: String
        },
        title: {
            type: String,
            required: true,
            minlength: 3
        },
        text: {
            type: String
        },
        substrate: {
            img: { type: String },
            alt: { type: String }
        },
    },
    {
        versionKey: false
    })

module.exports = mongoose.model('Publication', Publication);