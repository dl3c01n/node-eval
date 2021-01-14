const mongoose = require('mongoose');

const noteSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:  'User'
    }
},
{
    collection: 'notes'
})

module.exports = mongoose.model('noteSchema', noteSchema);