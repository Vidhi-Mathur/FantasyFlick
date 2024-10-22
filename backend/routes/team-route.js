const express = require('express')
const router = express.Router()
const { getTeams, getTeamByTeamId, createTeam, updateTeam } = require('../controllers/team-controller')

//GET /teams: Retrieves all teams
router.get('/', getTeams)

//GET /teams/teamId: Retrieves team by Id
router.get('/:teamId', getTeamByTeamId)

//POST /teams/create: Create teams
router.post('/create', createTeam)

//PUT /teams/update: Updates teams
router.put('/update', updateTeam)

module.exports = router