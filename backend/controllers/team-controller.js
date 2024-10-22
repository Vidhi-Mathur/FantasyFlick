const Team = require("../models/team-model")

//Getting all teams
exports.getTeams = async(req, res, next) => {
    try {
        const teams = await Team.find({})
        return res.status(200).json({ teams })
    }
    catch(err){
        next(err)
    }
}

//Getting team info based on info.
exports.getTeamByTeamId = async(req, res, next) => {
    try {
        const { teamId } = req.params
        const team = await Team.findById(teamId)
        if(!team){
            return res.status(404).json({message: `No team found with ID ${teamId}`})
        }
        return res.status(200).json({ team })
    }
    catch(err){
        next(err)
    }
}

//Creating team
exports.createTeam = async(req, res, next) => {
    try {
        const { captain, teamName } = req.body
        const team = await Team.create({
            captain,
            teamName
        })
        res.status(200).json({ team })
    }
    catch(err){
        next(err)
    }
}

//Updating team players and points
exports.updateTeam = async(req, res, next) => {
    try {
        const { teamPoints, players, teamId} = req.body
        const team = await Team.findById(teamId)
        if (!team) {
            return res.status(404).json({ message: "Team not found" })
        }
        if(players.length < 0){
            return res.status(400).json({ message: "A team can have a minimum of 1 player" })
        }
        if(players.length > 11){
            return res.status(400).json({ message: "A team can have a maximum of 11 players" })
        }
        team.teamPoints = teamPoints 
        team.players = players
        await team.save() 
        res.status(200).json({ team })
    } 
    catch (err){
        next(err)
    }
}