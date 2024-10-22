const mongoose = require('mongoose')
const schema = mongoose.Schema

const team = new schema({
    captain: {
        type: 'String',
        required: true
    },
    teamName: {
        type: 'String',
        required: true
    },
    players: [{
        type: "String",
        default: null,
        max: 11
    }],
    teamPoints: {
        type: 'Number',
        default: 0
    }
})

module.exports = mongoose.model('Team', team)