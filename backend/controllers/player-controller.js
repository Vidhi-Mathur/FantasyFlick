require("dotenv").config()
const axios = require("axios");

//Getting players list
exports.getPlayers = async(req, res, next) => {
    try {
        const players = await axios(`https://api.cricapi.com/v1/players?apikey=${process.env.API_TOKEN}`)
        return res.status(200).json({ players: players.data })
    }
    catch(err){
        next(err)
    }
}

//Getting player info based on id
exports.getPlayerByPlayerId = async(req, res, next) => {
    try {
        const { playerId } = req.params
        const player = await axios(`https://api.cricapi.com/v1/players_info?apikey=${process.env.API_TOKEN}&id=${playerId}`)
        if(!player){
            return res.status(404).json({message: `No player found with ID ${playerId}`})
        }
        return res.status(200).json({ player: player.data })
    }
    catch(err){
        next(err)
    }
}