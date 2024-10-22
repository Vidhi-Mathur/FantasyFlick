const express = require('express')
const router = express.Router()
const { getPlayers, getPlayerByPlayerId } = require('../controllers/player-controller')

//GET /players: Retrieves all players
router.get('/', getPlayers)

//GET /players/playerId: Retrieves player by Id
router.get('/:playerId', getPlayerByPlayerId)

module.exports = router