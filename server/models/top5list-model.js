const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Top5ListSchema = new Schema(
    {
        name: { type: String, required: true },
        items: { type: [String], required: true },
        ownerEmail: {type: String, required: true},
        views: {type: Number, required: true},
        likes: {type: Number, required: true},
        dislikes: {type: Number, required: true},
        date: {type: Date, required: true},
        published: {type: Boolean, required: true},
        comments: [{owner: String, comment: String}]
    },
    { timestamps: true },
)

module.exports = mongoose.model('Top5List', Top5ListSchema)
