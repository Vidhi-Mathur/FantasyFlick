const mongoose = require('mongoose')
const schema = mongoose.Schema

const team = new schema({
    captain: {
        type: 'String',
        required: true,
        minlength: [1, 'Captain cannot be an empty string']
    },
    teamName: {
        type: 'String',
        unique: true,
        required: true,
        minLength: [1, 'Team name cannot be an empty string']
    },
    players: [{
        type: "String",
        default: null
    }],
    teamPoints: {
        type: 'Number',
        default: 0
    }
})

module.exports = mongoose.model('Team', team)